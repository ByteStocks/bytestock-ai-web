'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '@/components/forms/InputField';
import SelectField from '@/components/forms/SelectField';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteBrokerConnection, saveBrokerConnection } from '@/lib/actions/mcp.actions';

type BrokerProvider = 'zerodha' | 'groww';

type ConnectionListItem = {
  id: string;
  broker: BrokerProvider;
  label: string;
  tokenHint: string;
  updatedAt: string;
};

type McpConnectFormData = {
  broker: BrokerProvider;
  label: string;
  accessToken: string;
};

const BROKER_OPTIONS = [
  { value: 'zerodha', label: 'Zerodha (Kite)' },
  { value: 'groww', label: 'Groww' },
] as const;

const formatUpdatedAt = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleString();
};

const McpClient = ({ initialConnections }: { initialConnections: ConnectionListItem[] }) => {
  const [connections, setConnections] = useState<ConnectionListItem[]>(initialConnections);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<McpConnectFormData>({
    defaultValues: {
      broker: 'zerodha',
      label: '',
      accessToken: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: McpConnectFormData) => {
    const result = await saveBrokerConnection(data);
    if (!result.success) {
      toast.error('Connection failed', { description: result.message });
      return;
    }

    if (result.connection) {
      setConnections((prev) => {
        const withoutUpdated = prev.filter((item) => item.id !== result.connection?.id);
        return [result.connection, ...withoutUpdated];
      });
    }

    reset({ broker: data.broker, label: '', accessToken: '' });
    toast.success('Broker connected', { description: result.message });
  };

  const handleDisconnect = (id: string) => {
    startTransition(async () => {
      const result = await deleteBrokerConnection(id);
      if (!result.success) {
        toast.error('Could not remove connection', { description: result.message });
        return;
      }
      setConnections((prev) => prev.filter((item) => item.id !== id));
      toast.success('Connection removed', { description: result.message });
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="rounded-lg border border-gray-600 bg-gray-800 p-6">
        <h2 className="text-xl font-semibold text-gray-100">Connect Broker</h2>
        <p className="mt-2 text-sm text-gray-400">
          Add a broker token to sync your portfolio. Tokens are stored encrypted on the server.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <SelectField
            name="broker"
            label="Broker"
            placeholder="Select broker"
            options={BROKER_OPTIONS}
            control={control}
            error={errors.broker}
            required
          />

          <InputField
            name="label"
            label="Account Label"
            placeholder="Primary account"
            register={register}
            error={errors.label}
          />

          <InputField
            name="accessToken"
            label="Access Token"
            placeholder="Paste your broker token"
            type="password"
            register={register}
            error={errors.accessToken}
            validation={{ required: 'Access token is required' }}
          />

          <Button type="submit" disabled={isSubmitting || isPending} className="yellow-btn w-full">
            {isSubmitting || isPending ? 'Connecting...' : 'Connect'}
          </Button>
        </form>
      </section>

      <section className="rounded-lg border border-gray-600 bg-gray-800 p-6">
        <h2 className="text-xl font-semibold text-gray-100">Connections</h2>
        <p className="mt-2 text-sm text-gray-400">
          Manage connected brokers and review portfolio sync status.
        </p>

        <div className="mt-6 space-y-4">
          {connections.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-600 p-6 text-center text-gray-500">
              No brokers connected yet.
            </div>
          ) : (
            connections.map((connection) => (
              <div
                key={connection.id}
                className="flex flex-col gap-4 rounded-lg border border-gray-600 bg-gray-700/40 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-gray-100">
                    {connection.label} • {connection.broker.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-400">Token: {connection.tokenHint}</p>
                  <p className="text-xs text-gray-500">Updated {formatUpdatedAt(connection.updatedAt)}</p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isPending}
                  onClick={() => handleDisconnect(connection.id)}
                  className="w-full md:w-auto"
                >
                  Disconnect
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 rounded-lg border border-gray-600 bg-gray-900/40 p-4 text-sm text-gray-400">
          Portfolio sync is in beta. Once broker APIs are configured, holdings and P&amp;L will appear here.
        </div>
      </section>
    </div>
  );
};

export default McpClient;
