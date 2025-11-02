--
-- PostgreSQL database dump
--

\restrict xVzZHkVtBQrYasVoDMNSjTYVbOIRIi5pgFkgZbNxx9mqAW9vom1wPyEUzcj5iph

-- Dumped from database version 14.19 (Homebrew)
-- Dumped by pg_dump version 14.19 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: public; Owner: aichurekasylbek
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying(150) NOT NULL,
    description text,
    date date NOT NULL,
    venue character varying(255),
    capacity integer DEFAULT 0,
    created_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.events OWNER TO aichurekasylbek;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: aichurekasylbek
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO aichurekasylbek;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aichurekasylbek
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: registrations; Type: TABLE; Schema: public; Owner: aichurekasylbek
--

CREATE TABLE public.registrations (
    id integer NOT NULL,
    user_id integer,
    event_id integer,
    ticket_type character varying(50) DEFAULT 'Regular'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.registrations OWNER TO aichurekasylbek;

--
-- Name: registrations_id_seq; Type: SEQUENCE; Schema: public; Owner: aichurekasylbek
--

CREATE SEQUENCE public.registrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registrations_id_seq OWNER TO aichurekasylbek;

--
-- Name: registrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aichurekasylbek
--

ALTER SEQUENCE public.registrations_id_seq OWNED BY public.registrations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: aichurekasylbek
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'attendee'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['attendee'::character varying, 'organizer'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO aichurekasylbek;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: aichurekasylbek
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO aichurekasylbek;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aichurekasylbek
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: registrations id; Type: DEFAULT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.registrations ALTER COLUMN id SET DEFAULT nextval('public.registrations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: aichurekasylbek
--

COPY public.events (id, title, description, date, venue, capacity, created_by, created_at) FROM stdin;
1	Tech Talk	Mini meetup about web development	2025-11-05	Sunnyvale Center	30	1	2025-11-02 13:02:05.777999
2	Music Party	Fun music and games	2025-11-08	Downtown Hall	50	1	2025-11-02 13:02:05.777999
3	Yoga Class	Morning yoga session for beginners	2025-11-10	Community Gym	20	1	2025-11-02 13:02:05.777999
\.


--
-- Data for Name: registrations; Type: TABLE DATA; Schema: public; Owner: aichurekasylbek
--

COPY public.registrations (id, user_id, event_id, ticket_type, created_at) FROM stdin;
1	2	1	Regular	2025-11-02 13:02:11.230158
2	2	2	VIP	2025-11-02 13:02:11.230158
3	2	3	Regular	2025-11-02 13:02:11.230158
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: aichurekasylbek
--

COPY public.users (id, name, email, password, role, created_at) FROM stdin;
4	Test User	test@eventify.com	$2b$10$ISEMmdtmK5v5PVp1oeI2GuOWwnKgrk5RU2waDDLHkHTBnRN7.ayty	attendee	2025-11-02 13:48:56.902932
1	Aya Organizer	aya@eventify.com	$2b$10$y0Y9tVHUWdrgDDGJNSckX.XozbwjQuFExamzJ4bBHiJgpd.OzhJB2	organizer	2025-11-02 13:01:59.388029
2	Adam Student	adam@eventify.com	$2b$10$HLwTOsd6igd8X2dZ3iloeumi1g0qrdAfjfe3Jlz0jeUp37DVKiNEy	attendee	2025-11-02 13:01:59.388029
3	Admin Test	admin@eventify.com	$2b$10$jOqNCdMT4wmIyHMNv1Dhr.HjuXLhyxTB9W0XTqchZCQ2qw85YpIoy	admin	2025-11-02 13:01:59.388029
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aichurekasylbek
--

SELECT pg_catalog.setval('public.events_id_seq', 3, true);


--
-- Name: registrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aichurekasylbek
--

SELECT pg_catalog.setval('public.registrations_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aichurekasylbek
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: registrations registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: events events_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: registrations registrations_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: registrations registrations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.registrations
    ADD CONSTRAINT registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict xVzZHkVtBQrYasVoDMNSjTYVbOIRIi5pgFkgZbNxx9mqAW9vom1wPyEUzcj5iph

