--
-- PostgreSQL database dump
--

\restrict UKm4MEtlH8Dh8tqDgTTDdcS3uOPjrehJcAMLUVhLENYq5FOexMdrkdkiv0umTlJ

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
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    organizer_id integer
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

COPY public.events (id, title, description, date, venue, capacity, created_by, created_at, organizer_id) FROM stdin;
1	Tech Talk	Mini meetup about web development	2025-11-05	Sunnyvale Center	30	1	2025-11-02 13:02:05.777999	1
4	React Meetup	Learn React basics	2025-11-20	Techtonica Lab	50	1	2025-11-02 15:11:03.931803	1
5	Techtonica Meet Up	All graduates let's connect in San Jose!	2025-11-29	San Jose City Hall	10	1	2025-11-03 00:32:19.996369	1
3	Yoga Class	Morning yoga session for beginners	2025-11-22	Community Gym	15	1	2025-11-02 13:02:05.777999	1
2	Music Party	Fun music and games	2025-11-08	Downtown Hall	53	1	2025-11-02 13:02:05.777999	1
6	Doordash event	delivery food	2025-11-22	San Jose	10	9	2025-11-03 12:06:35.441419	\N
7	Uber Delivery meet up	Meet up	2025-11-14	SAn Jose Downtown	10	\N	2025-11-03 12:23:53.693181	9
\.


--
-- Data for Name: registrations; Type: TABLE DATA; Schema: public; Owner: aichurekasylbek
--

COPY public.registrations (id, user_id, event_id, ticket_type, created_at) FROM stdin;
21	8	1	Regular	2025-11-03 11:13:13.133543
22	8	2	Regular	2025-11-03 11:13:15.475023
23	8	4	Regular	2025-11-03 11:13:16.562974
24	8	3	Regular	2025-11-03 11:13:17.586195
26	2	1	Regular	2025-11-03 11:13:57.862221
27	2	2	Regular	2025-11-03 11:13:58.564459
28	2	4	Regular	2025-11-03 11:13:59.347817
29	2	3	Regular	2025-11-03 11:14:00.022881
30	2	5	Regular	2025-11-03 11:14:00.667465
32	7	6	Regular	2025-11-03 12:07:00.400352
33	8	7	Regular	2025-11-03 12:47:41.173455
34	8	6	Regular	2025-11-03 12:47:43.237668
35	8	5	Regular	2025-11-03 12:47:44.428697
36	7	1	Regular	2025-11-03 12:50:40.757145
37	7	2	Regular	2025-11-03 12:50:41.27586
38	7	7	Regular	2025-11-03 12:50:42.480692
39	7	4	Regular	2025-11-03 12:50:43.151009
40	7	3	Regular	2025-11-03 12:50:44.366991
41	7	5	Regular	2025-11-03 12:50:45.802591
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: aichurekasylbek
--

COPY public.users (id, name, email, password, role, created_at) FROM stdin;
1	Aya Organizer	aya@eventify.com	$2b$10$y0Y9tVHUWdrgDDGJNSckX.XozbwjQuFExamzJ4bBHiJgpd.OzhJB2	organizer	2025-11-02 13:01:59.388029
2	Adam Student	adam@eventify.com	$2b$10$HLwTOsd6igd8X2dZ3iloeumi1g0qrdAfjfe3Jlz0jeUp37DVKiNEy	attendee	2025-11-02 13:01:59.388029
3	Admin Test	admin@eventify.com	$2b$10$jOqNCdMT4wmIyHMNv1Dhr.HjuXLhyxTB9W0XTqchZCQ2qw85YpIoy	admin	2025-11-02 13:01:59.388029
7	Alan Salamat	alan@eventify.com	$2b$10$S5uDh7lO.rXAvPk4fEJAPePb.HJ.MFIOiR2UYcCIx9L0gAOby6qQK	attendee	2025-11-03 01:42:24.878133
8	Sam Supataev	sam@eventify.com	$2b$10$180j64XrhWxWp/edyaNr0.0yEdjg2ZmWGFfJULOlq/yhNCvupU90e	attendee	2025-11-03 01:47:36.729383
9	Alla	alla@eventify.com	$2b$10$wUsLXY14l/ueFHEH5ysuYOs73oQjquHERIrCPOL95Ye7Ngzf.ewlK	organizer	2025-11-03 12:05:50.684986
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aichurekasylbek
--

SELECT pg_catalog.setval('public.events_id_seq', 7, true);


--
-- Name: registrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aichurekasylbek
--

SELECT pg_catalog.setval('public.registrations_id_seq', 41, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: aichurekasylbek
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


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
-- Name: events events_organizer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: aichurekasylbek
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_organizer_id_fkey FOREIGN KEY (organizer_id) REFERENCES public.users(id);


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

\unrestrict UKm4MEtlH8Dh8tqDgTTDdcS3uOPjrehJcAMLUVhLENYq5FOexMdrkdkiv0umTlJ

