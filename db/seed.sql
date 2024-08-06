\c angler_dev;

INSERT INTO users (username, password, email) VALUES
('guest', '1234', 'test@example.com'),
('overtonjust', 'pursuit', 'joverton@pursuit.org'),
('demo', '1234', 'demo@pursuit.com');

INSERT INTO watchlists (name, is_favorite, description, user_id) VALUES
('oranges', true, '', 2),
('purples', false, '', 2),
('My favs', false, 'I''ll never say no to catching one of these!', 1),
('Sharks only', true, 'A Shark week exclusive', 1);

INSERT INTO fish (
    name, 
    image, 
    icon, 
    bait, 
    scrip_type, 
    region, 
    area,
    time_window,
    weather_found, 
    closest_aetheryte
) VALUES
(
    'Urqofrog', 
    'https://ffxiv.gamerescape.com/w/images/8/8a/Model-Urqofrog.png', 
    'https://ffxiv.gamerescape.com/w/images/7/7e/Urqofrog_Icon.png',
    ARRAY ['Red Maggots', 'Versatile Lure'],
    'Orange',
    'Urqopacha',
    'Karvarhur the First',
    '20:00-0:00',
    ARRAY ['Any'],
    'Worlar''s Echo'
),
(
    'Yellow Peacock Bass', 
    'https://ffxiv.gamerescape.com/w/images/8/80/Model-Yellow_Peacock_Bass.png', 
    'https://ffxiv.gamerescape.com/w/images/f/f9/Yellow_Peacock_Bass_Icon.png',
    ARRAY ['Mooch: Dumplingfish', 'Golden Stonefly Nymph', 'Honeybee', 'Popper Lure', 'Red Maggots', 'Versatile Lure'],
    'Orange',
    'Kozam''uka',
    'Marsh Ligaka',
    '12:00-13:00',
    ARRAY ['Any'],
    'Many Fires'
),
(
    'Chain Shark', 
    'https://ffxiv.gamerescape.com/w/images/e/eb/Model-Chain_Shark.png', 
    'https://ffxiv.gamerescape.com/w/images/6/60/Chain_Shark_Icon.png',
    ARRAY ['Mooch: Yak T''el Crab', 'Mooch: Sharknose Goby', 'Crimson Lugworm', 'Shucked Clam', 'Ghost Nipper', 'Versatile Lure'],
    'Orange',
    'Yak T''el',
    'Xty''iinbek Tsoly',
    '18:00-20:00',
    ARRAY ['Any'],
    'Mamook'
),
(
    'Cloud Wasp', 
    'https://ffxiv.gamerescape.com/w/images/c/c3/Model-Cloud_Wasp.png', 
    'https://ffxiv.gamerescape.com/w/images/c/cb/Cloud_Wasp_Icon.png',
    ARRAY ['Dragonfly', 'Versatile Lure'],
    'Orange',
    'Shaaloani',
    'Eastbound Zorgor',
    'Any',
    ARRAY ['Any'],
    'Sheshenewezi Springs'
),
(
    'Copper Shark', 
    'https://ffxiv.gamerescape.com/w/images/5/57/Model-Copper_Shark.png', 
    'https://ffxiv.gamerescape.com/w/images/d/d9/Copper_Shark_Icon.png',
    ARRAY ['Ghost Nipper', 'Versatile Lure'],
    'Orange',
    'Living Memory',
    'Canal Town North',
    'Any',
    ARRAY ['Fog', 'Clouds'],
    'Leynode Mnemo'
),
(
    'Toari Sucker', 
    'https://ffxiv.gamerescape.com/w/images/3/3b/Model-Toari_Sucker.png', 
    'https://ffxiv.gamerescape.com/w/images/e/e7/Toari_Sucker_Icon.png',
    ARRAY ['Popper Lure', 'Versatile Lure'],
    'Purple',
    'Shaaloani',
    'Lake Toari',
    'Any',
    ARRAY ['Any'],
    'Mehwahhetsoan'
);

INSERT INTO fish_finder (watchlist_id, fish_id) VALUES
(1,1),
(1,2),
(1,3),
(3,2),
(3,5),
(3,1),
(3,4),
(4,3),
(4,5);
