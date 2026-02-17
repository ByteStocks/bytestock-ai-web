'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/better-auth/auth';
import { connectToDatabase } from '@/database/mongoose';
import { BrokerConnection } from '@/database/models/broker-connection.model';
import { encryptSecret, maskSecret } from '@/lib/mcp/crypto';

type BrokerProvider = 'zerodha' | 'groww';

type SaveConnectionInput = {
  broker: BrokerProvider;
  label?: string;
  accessToken: string;
};

type ConnectionListItem = {
  id: string;
  broker: BrokerProvider;
  label: string;
  tokenHint: string;
  updatedAt: string;
};

const getSessionUserId = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) return null;
  return user.id;
};

const normalizeLabel = (label?: string) => {
  const normalized = label?.trim();
  return normalized && normalized.length > 0 ? normalized : 'Primary';
};

export async function getBrokerConnections(): Promise<ConnectionListItem[]> {
  const userId = await getSessionUserId();
  if (!userId) return [];

  await connectToDatabase();
  const connections = await BrokerConnection.find({ userId })
    .sort({ updatedAt: -1 })
    .lean();

  return connections.map((connection) => ({
    id: String(connection._id),
    broker: connection.broker,
    label: connection.label,
    tokenHint: connection.tokenHint,
    updatedAt: connection.updatedAt.toISOString(),
  }));
}

export async function saveBrokerConnection(input: SaveConnectionInput) {
  const userId = await getSessionUserId();
  if (!userId) {
    return { success: false, message: 'Please sign in to connect a broker.' };
  }

  const broker = input.broker;
  const accessToken = input.accessToken?.trim();
  const label = normalizeLabel(input.label);

  if (!broker || !accessToken) {
    return { success: false, message: 'Broker and access token are required.' };
  }

  await connectToDatabase();

  const tokenCiphertext = encryptSecret(accessToken);
  const tokenHint = maskSecret(accessToken);

  const connection = await BrokerConnection.findOneAndUpdate(
    { userId, broker, label },
    {
      userId,
      broker,
      label,
      tokenCiphertext,
      tokenHint,
    },
    { upsert: true, new: true }
  );

  return {
    success: true,
    message: 'Broker connected.',
    connection: {
      id: String(connection._id),
      broker: connection.broker,
      label: connection.label,
      tokenHint: connection.tokenHint,
      updatedAt: connection.updatedAt.toISOString(),
    },
  };
}

export async function deleteBrokerConnection(id: string) {
  const userId = await getSessionUserId();
  if (!userId) {
    return { success: false, message: 'Please sign in to manage connections.' };
  }

  await connectToDatabase();
  const result = await BrokerConnection.deleteOne({ _id: id, userId });

  if (!result.deletedCount) {
    return { success: false, message: 'Connection not found.' };
  }

  return { success: true, message: 'Connection removed.' };
}
