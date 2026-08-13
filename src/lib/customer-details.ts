export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  notes: string;
};

export const EMPTY_CUSTOMER: CustomerDetails = {
  name: "",
  phone: "",
  address: "",
  notes: "",
};

export function validateCustomerDetails(
  customer: CustomerDetails,
): string | null {
  const name = customer.name.trim();
  const phone = customer.phone.replace(/\D/g, "");
  const address = customer.address.trim();

  if (name.length < 2) return "Please enter your name.";
  if (phone.length < 10) return "Please enter a valid 10-digit phone number.";
  if (address.length < 5) return "Please enter your delivery address.";

  return null;
}

export function normalizeCustomerDetails(
  customer: CustomerDetails,
): CustomerDetails {
  return {
    name: customer.name.trim(),
    phone: customer.phone.replace(/\D/g, "").slice(-10),
    address: customer.address.trim(),
    notes: customer.notes.trim(),
  };
}
