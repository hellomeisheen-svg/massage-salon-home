import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  lazy,
  Suspense,
} from "react";

type BookingContextValue = {
  openBooking: (subject?: string) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

const BookingDialog = lazy(() => import("./BookingDialog"));

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>(undefined);

  const openBooking = useCallback((s?: string) => {
    setSubject(s);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {open && (
        <Suspense fallback={null}>
          <BookingDialog subject={subject} onClose={closeBooking} />
        </Suspense>
      )}
    </BookingContext.Provider>
  );
}
