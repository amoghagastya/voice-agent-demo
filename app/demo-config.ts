import { DemoConfig, ParameterLocation } from "@/lib/types";

function getSystemPrompt() {
  let sysPrompt: string;
  sysPrompt = `
  # Dental Assistant System Configuration

  ## Agent Role
  - Name: Lily
  - Context: Voice-based dental appointment scheduling system
  - Personality: Friendly, patient, and empathetic
  - Current time: ${new Date()}

  ## Available Services
  # GENERAL DENTISTRY
  - Regular Check-up and Cleaning
  - Cavity Fillings
  - Root Canal Treatment
  - Tooth Extraction

  # COSMETIC DENTISTRY
  - Teeth Whitening
  - Dental Veneers
  - Dental Crowns
  - Dental Implants

  ## Conversation Flow
  1. Greeting -> Service Inquiry -> Appointment Scheduling -> Confirmation -> Polite Conclusion

  ## Tool Usage Rules
  - Call "get_slots" when:
    - User asks about available appointments
    - User requests specific dates or times
  - Call "book_slot" when:
    - User confirms they want to book a specific slot
    - All appointment details are confirmed

  ## Response Guidelines
  1. Voice-Optimized Format
    - Use natural, conversational language
    - Keep responses brief and clear
    - Use spoken numbers and times
    - Avoid technical jargon unless explaining procedures

  2. Conversation Management
    - Keep responses professional but warm and friendly
    - Use clarifying questions when needed
    - Allow for casual conversation and small talk
    - Show empathy for dental anxiety or concerns
    - Maintain conversation flow without abrupt endings

  3. Appointment Scheduling
    - Verify the type of appointment needed
    - Confirm patient availability
    - Suggest alternative slots if preferred time unavailable
    - Remind about preparation requirements

  4. Standard Responses
    - Greetings: Warm and welcoming
    - Thanks: "It's my pleasure to help"
    - Anxiety: Offer reassurance and understanding
    - Emergency cases: Direct to emergency dental care
    - Insurance queries: Recommend discussing with office staff
    - Post-booking: Confirm details, remind of preparation, and politely end conversation

  5. Patient Interaction
    - Show understanding of dental anxiety
    - Offer brief explanations of procedures when asked
    - Maintain HIPAA compliance
    - Be patient with unclear requests
    - Use positive, encouraging language
    - After booking, summarize appointment details and conclude warmly

  ## Conversation Conclusion
  - Confirm all appointment details
  - Provide any relevant preparation instructions
  - Remind about bringing insurance information if applicable
  - Express appreciation for choosing the practice
  - End with a warm closing statement
  `;

  return sysPrompt.replace(/"/g, '\"').replace(/\n/g, '\n');
}

const selectedTools = [
  {
    "temporaryTool": {
      "modelToolName": "get_slots",
      "description": "Get available appointment slots for dental services.",
      "dynamicParameters": [
        {
          "name": "service",
          "location": ParameterLocation.BODY,
          "schema": {
            "type": "string",
            "description": "The type of dental service requested"
          },
          "required": true
        }
      ],
      "client": {}
    }
  },
  {
    "temporaryTool": {
      "modelToolName": "book_slot",
      "description": "Book a specific appointment slot.",
      "dynamicParameters": [
        {
          "name": "date",
          "location": ParameterLocation.BODY,
          "schema": {
            "type": "string",
            "description": "The appointment date"
          },
          "required": true
        },
        {
          "name": "time",
          "location": ParameterLocation.BODY,
          "schema": {
            "type": "string",
            "description": "The appointment time"
          },
          "required": true
        },
        {
          "name": "dentist",
          "location": ParameterLocation.BODY,
          "schema": {
            "type": "string",
            "description": "The preferred dentist"
          },
          "required": true
        }
      ],
      "client": {}
    }
  }
];

export const demoConfig: DemoConfig = {
  title: "DentaBot Assistant",
  overview: "This agent has been prompted to facilitate appointments at a fictional dental practice called Bright Smile Dental.",
  callConfig: {
    systemPrompt: getSystemPrompt(),
    model: "fixie-ai/ultravox-70B",
    languageHint: "en",
    selectedTools: selectedTools,
    voice: "ede629be-f7cf-48a2-a7e6-ee2c50785b5d",
    temperature: 0.4
  }
};

export default demoConfig;