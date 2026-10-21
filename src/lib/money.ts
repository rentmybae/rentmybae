// All money is integer paise. No floats are persisted.
export const ALLOWED_DURATIONS_MIN = [60, 120, 180, 240, 360, 480] as const;

export const gstOn = (amountPaise: number, gstBps: number) => Math.round((amountPaise * gstBps) / 10000);

export function membershipBreakdown(basePaise: number, gstBps: number) {
  if (!Number.isInteger(basePaise) || basePaise <= 0) throw new Error("invalid base price");
  const gstPaise = gstOn(basePaise, gstBps);
  return { basePaise, gstPaise, totalPaise: basePaise + gstPaise };
}

export function bookingBreakdown(i: {
  hourlyRatePaise: number; durationMinutes: number; platformFeeBps: number; commissionBps: number; gstBps: number;
}) {
  if (!ALLOWED_DURATIONS_MIN.includes(i.durationMinutes as never)) throw new Error("invalid duration");
  if (!Number.isInteger(i.hourlyRatePaise) || i.hourlyRatePaise <= 0) throw new Error("invalid rate");
  const subtotalPaise = Math.round((i.hourlyRatePaise * i.durationMinutes) / 60);
  const platformFeePaise = Math.round((subtotalPaise * i.platformFeeBps) / 10000);
  const gstPaise = gstOn(platformFeePaise, i.gstBps);
  const commissionPaise = Math.round((subtotalPaise * i.commissionBps) / 10000);
  return {
    subtotalPaise, platformFeePaise, gstPaise,
    totalPaise: subtotalPaise + platformFeePaise + gstPaise,
    commissionPaise, companionNetPaise: subtotalPaise - commissionPaise
  };
}

export function formatINR(paise: number) {
  const r = paise / 100;
  return "₹" + r.toLocaleString("en-IN", { minimumFractionDigits: paise % 100 ? 2 : 0, maximumFractionDigits: 2 });
}
