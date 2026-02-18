import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// 1. Create the MCP Server
const server = new McpServer({
    name: "hello-world-mcp",
    version: "1.0.0",
});
// 2. Define the Tool
server.tool("say_hello", // Tool Name
{ name: z.string().describe("The name of the person to greet") }, // Input Schema
async ({ name }) => {
    // 3. Tool Logic
    const message = `Hello, ${name}! Welcome to the MetaCall MCP universe.`;
    // 4. Return the result (must follow MCP content format)
    return {
        content: [
            {
                type: "text",
                text: message,
            },
        ],
    };
});
// 5. Start the Server using Stdio Transport
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    //   console.error("MCP Server running on stdio...");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
