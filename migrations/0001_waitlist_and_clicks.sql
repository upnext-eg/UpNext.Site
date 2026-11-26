-- De wachtlijst: wie de app als een van de eersten wil downloaden. Alleen wat nodig is om straks één mail te sturen.
CREATE TABLE waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    language TEXT NOT NULL,
    source TEXT NOT NULL,
    created_at TEXT NOT NULL
);

-- De downloadbereidheid: hoe vaak er per dag op Download of een store-knop is gedrukt, per plek op de pagina. Anoniem: alleen aantallen.
CREATE TABLE clicks (
    day TEXT NOT NULL,
    target TEXT NOT NULL,
    source TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (day, target, source)
);
