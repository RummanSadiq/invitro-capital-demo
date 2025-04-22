import { TimeSlot } from "@/types/doctors";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  };

export const generateTimeSlots = (doctorId: number): TimeSlot[] => {
  const today = new Date();
  const slots: TimeSlot[] = [];
  
  // Generate slots for the next 5 days
  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Generate 3-5 random time slots per day
    const numSlots = Math.floor(Math.random() * 3) + 3;
    // Track used hours to avoid duplicates
    const usedHours = new Set<string>();
    
    for (let j = 0; j < numSlots; j++) {
      // Generate random hour between 8 AM and 5 PM
      const hour = Math.floor(Math.random() * 9) + 8;
      const minute = Math.random() > 0.5 ? 0 : 30;
      
      // Create a unique time key to prevent duplicates
      const timeKey = `${hour}-${minute}`;
      
      // Skip if this hour-minute combination is already used for this day
      if (usedHours.has(timeKey)) {
        // Ensure we still get the right number of slots
        j--;
        continue;
      }
      
      usedHours.add(timeKey);
      
      // Use a more unique ID including the loop iteration and timestamp
      const uniqueId = `${doctorId}-${date.toDateString()}-${timeKey}-${j}-${Date.now()}`;
      
      slots.push({
        id: uniqueId,
        date: new Date(date.setHours(hour, minute, 0, 0)),
        available: true
      });
    }
  }
  
  return slots.sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const formatDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  
  return {
    dateOnly: `${month} ${day}, ${year}`,
    timeOnly: `${hours}:${minutes} ${ampm}`,
    dateTime: `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`
  };
};