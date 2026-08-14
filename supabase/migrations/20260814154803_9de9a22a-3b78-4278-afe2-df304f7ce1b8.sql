-- Функция для проверки лимита (rate limiting) на уровне БД
-- Использует IP отправителя (request.header('x-real-ip') или аналоги в Supabase/PostgREST)
CREATE OR REPLACE FUNCTION public.check_lead_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
    client_ip text;
    recent_count int;
BEGIN
    -- В Supabase IP можно получить через настройки сессии
    client_ip := current_setting('request.headers', true)::jsonb->>'x-real-ip';
    
    -- Если IP не определен (например, локальные тесты), пропускаем
    IF client_ip IS NULL THEN
        RETURN NEW;
    END IF;

    -- Считаем записи от этого IP за последние 10 минут
    SELECT count(*) INTO recent_count
    FROM public.leads
    WHERE created_at > now() - interval '10 minutes'
      AND (current_setting('request.headers', true)::jsonb->>'x-real-ip') = client_ip;

    -- Лимит: 3 заявки за 10 минут
    IF recent_count >= 3 THEN
        RAISE EXCEPTION 'Too many requests. Please try again later.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Устанавливаем триггер
DROP TRIGGER IF EXISTS tr_lead_rate_limit ON public.leads;
CREATE TRIGGER tr_lead_rate_limit
BEFORE INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.check_lead_rate_limit();
