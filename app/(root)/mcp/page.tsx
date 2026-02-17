import McpClient from '@/components/mcp/McpClient';
import { getBrokerConnections } from '@/lib/actions/mcp.actions';

const McpPage = async () => {
  const connections = await getBrokerConnections();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-100">MCP</h1>
        <p className="text-gray-400">
          Connect Zerodha or Groww to track your portfolio and investments.
        </p>
      </header>

      <McpClient initialConnections={connections} />
    </div>
  );
};

export default McpPage;
