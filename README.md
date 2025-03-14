# Dental Appointment Scheduling AI Assistant
An AI-powered voice assistant that helps patients schedule dental appointments and provides information about dental services. Built using Next.js and powered by the first [open-source speech-to-speech model](https://github.com/fixie-ai/ultravox).

> 💡 **Note:** The application uses Llama 3.2B finetune - [fixie-ai/ultravox-v0_5-llama-3_2-1b](https://huggingface.co/fixie-ai/ultravox-v0_5-llama-3_2-1b), hosted on [Ultravox cloud infrastructure](htt[s://ultravox.ai) for seamless voice interactions.

## Set-up
1. Add an Ultravox API key
  * Create a file called `.env.local`
  * In `.env.local` add your key like this: `ULTRAVOX_API_KEY=<YOUR_KEY_HERE>`

## Running
1. This repo uses `pnpm`. Installation instructions [here](https://pnpm.io/installation).
1. Install all depedencies with `pnpm install`.
1. Run the app with `pnpm dev`.

## AI Assistant Configuration
The assistant's behavior is configured through the `demo-config.ts` file. This file defines the AI session, tools, and prompts.

## Client-Side Tool Integration
The assistant leverages client-side tool implementations for real-time appointment management:

### Get Available Slots
```typescript
// Client-implemented tool
getSlotsTools: ClientToolImplementation = (parameters) => {
  // Returns available slots and triggers UI update
  return "Retrieved available slots.";
}
```

### Book Appointment
```typescript
// Client-implemented tool
bookSlotTool: ClientToolImplementation = (parameters) => {
  // Processes booking and updates UI
  return `Appointment booked for ${date} at ${time}`;
}
 ```

ℹ️ Tool Execution: Tools are registered with the AI session and executed directly in the browser, enabling immediate UI updates and real-time user feedback.

## Project Structure
```plaintext
/
├── app/                    # Next.js app directory
│   ├── components/        # React components
│   ├── demo-config.ts     # AI assistant configuration
│   └── page.tsx          # Main application page
├── lib/                   # Shared utilities
│   ├── callFunctions.ts  # Call handling functions
│   ├── clientTools.ts    # Tool implementations
│   └── types.ts         # TypeScript definitions
└── public/               # Static assets
