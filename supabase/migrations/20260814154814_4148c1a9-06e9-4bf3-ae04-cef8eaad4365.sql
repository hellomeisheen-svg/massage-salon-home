-- Запрещаем публичный вызов функции через API
REVOKE EXECUTE ON FUNCTION public.check_lead_rate_limit() FROM public;
REVOKE EXECUTE ON FUNCTION public.check_lead_rate_limit() FROM anon;
REVOKE EXECUTE ON FUNCTION public.check_lead_rate_limit() FROM authenticated;
