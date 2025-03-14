import { ClientToolImplementation } from 'ultravox-client';

// Client-implemented tool for Order Details
export const updateOrderTool: ClientToolImplementation = (parameters) => {
  const { orderDetailsData } = parameters;
  console.debug("Received order details update:", orderDetailsData);

  if (typeof window !== "undefined") {
    // Convert orderDetailsData to string if it's an object
    const orderDataString = typeof orderDetailsData === 'string' 
      ? orderDetailsData 
      : JSON.stringify(orderDetailsData);

    const event = new CustomEvent("orderDetailsUpdated", {
      detail: orderDataString,
    });
    window.dispatchEvent(event);
  }

  return "Updated the order details.";
};

// Tool for getting available appointment slots
export const getSlotsTools: ClientToolImplementation = (parameters) => {
  // Mock data - in real implementation, this would fetch from your backend
  const availableSlots = [
    { date: "2024-03-20", time: "09:00", dentist: "Dr. Smith" },
    { date: "2024-03-20", time: "14:30", dentist: "Dr. Johnson" },
    { date: "2024-03-21", time: "11:00", dentist: "Dr. Smith" },
  ];

  if (typeof window !== "undefined") {
    const event = new CustomEvent("availableSlotsUpdated", {
      detail: availableSlots,
    });
    window.dispatchEvent(event);
  }

  return "Retrieved available slots.";
};

// Tool for booking an appointment slot
export const bookSlotTool: ClientToolImplementation = (parameters) => {
  const { date, time, dentist } = parameters;
  console.debug("Booking appointment:", { date, time, dentist });

  if (typeof window !== "undefined") {
    const event = new CustomEvent("appointmentBooked", {
      detail: { date, time, dentist },
    });
    window.dispatchEvent(event);
  }

  return `Appointment booked for ${date} at ${time} with ${dentist}`;
};
