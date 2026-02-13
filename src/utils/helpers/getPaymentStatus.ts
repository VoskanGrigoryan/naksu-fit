import type { User } from "../../store/usersStore";
import type { PaymentStatus } from "../../views/users/columns";

export function getPaymentStatus(user: User): PaymentStatus {
  if (!user.classes.length) return "pending";

  const totalPaid = user.classes.reduce(
    (acc, c) => acc + c.amountPaid,
    0
  );

  const totalDue = user.classes.reduce(
    (acc, c) =>
      acc + (c.pricePerClass ?? 0) * c.totalClasses,
    0
  );

  if (totalPaid >= totalDue) return "paid";
  if (totalPaid === 0) return "overdue";
  return "pending";
}
