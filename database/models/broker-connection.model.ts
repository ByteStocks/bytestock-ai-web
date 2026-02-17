import { Schema, model, models, type Document, type Model } from 'mongoose';

export type BrokerProvider = 'zerodha' | 'groww';

export interface BrokerConnectionDocument extends Document {
  userId: string;
  broker: BrokerProvider;
  label: string;
  tokenCiphertext: string;
  tokenHint: string;
  createdAt: Date;
  updatedAt: Date;
}

const BrokerConnectionSchema = new Schema<BrokerConnectionDocument>(
  {
    userId: { type: String, required: true, index: true },
    broker: { type: String, required: true, enum: ['zerodha', 'groww'] },
    label: { type: String, required: true, trim: true },
    tokenCiphertext: { type: String, required: true },
    tokenHint: { type: String, required: true },
  },
  { timestamps: true }
);

BrokerConnectionSchema.index({ userId: 1, broker: 1, label: 1 }, { unique: true });

export const BrokerConnection: Model<BrokerConnectionDocument> =
  (models?.BrokerConnection as Model<BrokerConnectionDocument>) ||
  model<BrokerConnectionDocument>('BrokerConnection', BrokerConnectionSchema);
