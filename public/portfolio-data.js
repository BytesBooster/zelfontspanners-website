// Shared Portfolio Data Functions
// This file contains shared logic for loading and managing portfolio data
// Used by both portfolio.js (public view) and portfolio-manage.js (management view)

// Static portfolio data - voeg hier foto's toe voor elk lid
// Gebruik het pad naar de portfolio folder: images/portfolio/[folder-naam]/[foto-naam]
const STATIC_PORTFOLIO_DATA = {
    'Willeke Buijssen': {
        name: 'Willeke Buijssen',
        photos: [
            { 
                src: 'images/portfolio/willeke-buijssen/PA152229-b.JPG', 
                title: 'PA152229 b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PA152238.JPG', 
                title: 'PA152238', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PA152250-a.JPG', 
                title: 'PA152250 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PA152278-a.JPG', 
                title: 'PA152278 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PA152305-b.JPG', 
                title: 'PA152305 b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PA152308-a.JPG', 
                title: 'PA152308 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192436.JPG', 
                title: 'PB192436', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192447c.JPG', 
                title: 'PB192447c', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192465.JPG', 
                title: 'PB192465', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192490b.JPG', 
                title: 'PB192490b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192506b.JPG', 
                title: 'PB192506b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192544.JPG', 
                title: 'PB192544', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192557.JPG', 
                title: 'PB192557', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192606.JPG', 
                title: 'PB192606', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192608.JPG', 
                title: 'PB192608', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/willeke-buijssen/PB192609.JPG', 
                title: 'PB192609', 
                category: 'all' 
            }
        ]
    },

    'Tim Cobussen': {
        name: 'Tim Cobussen',
        photos: [
            { 
                src: 'images/portfolio/tim-cobussen/109be227-d5de-4634-b046-660a36e24f4e.jpeg', 
                title: '109be227 d5de 4634 b046 660a36e24f4e', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/tim-cobussen/93778d5d-bbf7-4ef8-89d1-fd3fe8a76784.jpeg', 
                title: '93778d5d bbf7 4ef8 89d1 fd3fe8a76784', 
                category: 'all' 
            }
        ]
    },

    'Tiemen Meertens': {
        name: 'Tiemen Meertens',
        photos: [
            { 
                src: 'images/portfolio/tiemen-meertens/Foto-afdrukken-Tiemen-Meertens-A-Custom-1.jpg', 
                title: 'Foto afdrukken Tiemen Meertens A Custom 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/tiemen-meertens/Foto-afdrukken-Tiemen-Meertens-B-Custom-1.jpg', 
                title: 'Foto afdrukken Tiemen Meertens B Custom 1', 
                category: 'all' 
            }
        ]
    },

    'Theo Dennissen': {
        name: 'Theo Dennissen',
        photos: [
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1610.JPG', 
                title: 'DSC 1610', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1619.JPG', 
                title: 'DSC 1619', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1629.JPG', 
                title: 'DSC 1629', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1642.JPG', 
                title: 'DSC 1642', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1685.JPG', 
                title: 'DSC 1685', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1697.JPG', 
                title: 'DSC 1697', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1698.JPG', 
                title: 'DSC 1698', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1702.JPG', 
                title: 'DSC 1702', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1709.JPG', 
                title: 'DSC 1709', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1816.JPG', 
                title: 'DSC 1816', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1818.JPG', 
                title: 'DSC 1818', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1835.JPG', 
                title: 'DSC 1835', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1838.JPG', 
                title: 'DSC 1838', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1886.JPG', 
                title: 'DSC 1886', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1889.JPG', 
                title: 'DSC 1889', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1896.JPG', 
                title: 'DSC 1896', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1901.JPG', 
                title: 'DSC 1901', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1923.JPG', 
                title: 'DSC 1923', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_1961.JPG', 
                title: 'DSC 1961', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_2041.JPG', 
                title: 'DSC 2041', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_2083.JPG', 
                title: 'DSC 2083', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_2090.JPG', 
                title: 'DSC 2090', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_2890.JPG', 
                title: 'DSC 2890', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_2891.JPG', 
                title: 'DSC 2891', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_2915.JPG', 
                title: 'DSC 2915', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_2918.JPG', 
                title: 'DSC 2918', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_2921.JPG', 
                title: 'DSC 2921', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/DSC_9935.JPG', 
                title: 'DSC 9935', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/Foto-afdrukken-ATheo-Dennissen-Custom-1.jpg', 
                title: 'Foto afdrukken ATheo Dennissen Custom 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/theo-dennissen/Foto-afdrukken-BTheo-Dennissen-Custom-1.jpg', 
                title: 'Foto afdrukken BTheo Dennissen Custom 1', 
                category: 'all' 
            }
        ]
    },

    'Ruud Cox': {
        name: 'Ruud Cox',
        photos: [
            { 
                src: 'images/portfolio/ruud-cox/001.jpg', 
                title: '001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/002.jpg', 
                title: '002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/003-2.jpg', 
                title: '003 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/003.jpg', 
                title: '003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/004.jpg', 
                title: '004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/005.jpg', 
                title: '005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/010-2.jpg', 
                title: '010 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/020-haarmos-in-bloei-2.jpg', 
                title: '020 haarmos in bloei 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/028-2.jpg', 
                title: '028 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/1_001.jpg', 
                title: '1 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/1_002.jpg', 
                title: '1 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/1_003.jpg', 
                title: '1 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/1_004.jpg', 
                title: '1 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/1_005.jpg', 
                title: '1 005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/2_001.jpg', 
                title: '2 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/2_002.jpg', 
                title: '2 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/2_003.jpg', 
                title: '2 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/2_004.jpg', 
                title: '2 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/3_001.jpg', 
                title: '3 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/3_002.jpg', 
                title: '3 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/3_003.jpg', 
                title: '3 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/3_004.jpg', 
                title: '3 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/3_005.jpg', 
                title: '3 005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ruud-cox/4_004.jpg', 
                title: '4 004', 
                category: 'all' 
            }
        ]
    },

    'Ron Cuppes': {
        name: 'Ron Cuppes',
        photos: [
            { 
                src: 'images/portfolio/ron-cuppes/151023-Wandelbos-Tilburg-8792.jpg', 
                title: '151023 Wandelbos Tilburg 8792', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/151023-Wandelbos-Tilburg-8795.jpg', 
                title: '151023 Wandelbos Tilburg 8795', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/151023-Wandelbos-Tilburg-8801.jpg', 
                title: '151023 Wandelbos Tilburg 8801', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/151023-Wandelbos-Tilburg-8810.jpg', 
                title: '151023 Wandelbos Tilburg 8810', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/151023-Wandelbos-Tilburg-8834.jpg', 
                title: '151023 Wandelbos Tilburg 8834', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/1_Hemelse-Berg-231125-Oosterbeek_48A1779.jpg', 
                title: '1 Hemelse Berg 231125 Oosterbeek 48A1779', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/1_Hemelse-Berg-231125-Oosterbeek_48A1783.jpg', 
                title: '1 Hemelse Berg 231125 Oosterbeek 48A1783', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/1_Hemelse-Berg-231125-Oosterbeek_48A1796.jpg', 
                title: '1 Hemelse Berg 231125 Oosterbeek 48A1796', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/1_Hemelse-Berg-231125-Oosterbeek_48A1810.jpg', 
                title: '1 Hemelse Berg 231125 Oosterbeek 48A1810', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Avondfotografie-Rotterdam-9111.jpg', 
                title: 'Avondfotografie Rotterdam 9111', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Avondfotografie-Rotterdam-9112.jpg', 
                title: 'Avondfotografie Rotterdam 9112', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Avondfotografie-Rotterdam-9121.jpg', 
                title: 'Avondfotografie Rotterdam 9121', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Avondfotografie-Rotterdam-9209.jpg', 
                title: 'Avondfotografie Rotterdam 9209', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Avondfotografie-Rotterdam-9215.jpg', 
                title: 'Avondfotografie Rotterdam 9215', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Avondfotografie-Rotterdam-9217.jpg', 
                title: 'Avondfotografie Rotterdam 9217', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Avondfotografie-Rotterdam-9222.jpg', 
                title: 'Avondfotografie Rotterdam 9222', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Belsversven-240825-Oisterwijk_48A1323.jpg', 
                title: 'Belsversven 240825 Oisterwijk 48A1323', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Belsversven-240825-Oisterwijk_48A1327.jpg', 
                title: 'Belsversven 240825 Oisterwijk 48A1327', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Belsversven-240825-Oisterwijk_48A1329.jpg', 
                title: 'Belsversven 240825 Oisterwijk 48A1329', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Belsversven-240825-Oisterwijk_48A1336.jpg', 
                title: 'Belsversven 240825 Oisterwijk 48A1336', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Belsversven-240825-Oisterwijk_MG_7891.jpg', 
                title: 'Belsversven 240825 Oisterwijk MG 7891', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Belsversven-240825-Oisterwijk_MG_7896.jpg', 
                title: 'Belsversven 240825 Oisterwijk MG 7896', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Binnenveldse-Hooilanden-210724-Bennekom_48A0196.jpg', 
                title: 'Binnenveldse Hooilanden 210724 Bennekom 48A0196', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Binnenveldse-Hooilanden-210724-Bennekom_48A0199.jpg', 
                title: 'Binnenveldse Hooilanden 210724 Bennekom 48A0199', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Binnenveldse-Hooilanden-210724-Bennekom_48A0206.jpg', 
                title: 'Binnenveldse Hooilanden 210724 Bennekom 48A0206', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Binnenveldse-Hooilanden-210724-Bennekom_48A0240.jpg', 
                title: 'Binnenveldse Hooilanden 210724 Bennekom 48A0240', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Binnenveldse-Hooilanden-210724-Bennekom_48A0247.jpg', 
                title: 'Binnenveldse Hooilanden 210724 Bennekom 48A0247', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Binnenveldse-Hooilanden-210724-Bennekom_48A0266.jpg', 
                title: 'Binnenveldse Hooilanden 210724 Bennekom 48A0266', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Hemelse-Berg-231125-Oosterbeek_48A1779.jpg', 
                title: 'Hemelse Berg 231125 Oosterbeek 48A1779', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Hemelse-Berg-231125-Oosterbeek_48A1783.jpg', 
                title: 'Hemelse Berg 231125 Oosterbeek 48A1783', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Hemelse-Berg-231125-Oosterbeek_48A1796.jpg', 
                title: 'Hemelse Berg 231125 Oosterbeek 48A1796', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Hemelse-Berg-231125-Oosterbeek_48A1810.jpg', 
                title: 'Hemelse Berg 231125 Oosterbeek 48A1810', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Hemelse-Berg-231125-Oosterbeek_48A1819.jpg', 
                title: 'Hemelse Berg 231125 Oosterbeek 48A1819', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Hemelse-Berg-231125-Oosterbeek_48A1850.jpg', 
                title: 'Hemelse Berg 231125 Oosterbeek 48A1850', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Hemelse-Berg-231125-Oosterbeek_48A1878.jpg', 
                title: 'Hemelse Berg 231125 Oosterbeek 48A1878', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Het-Quin-201024-Afferden_48A0535.jpg', 
                title: 'Het Quin 201024 Afferden 48A0535', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Het-Quin-201024-Afferden_48A0572.jpg', 
                title: 'Het Quin 201024 Afferden 48A0572', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Het-Quin-201024-Afferden_48A0584.jpg', 
                title: 'Het Quin 201024 Afferden 48A0584', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Kasteel-Hoekelum-240324-Bennenkom_48A9427.jpg', 
                title: 'Kasteel Hoekelum 240324 Bennenkom 48A9427', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Kasteel-Hoekelum-240324-Bennenkom_48A9440.jpg', 
                title: 'Kasteel Hoekelum 240324 Bennenkom 48A9440', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Kasteel-Hoekelum-240324-Bennenkom_48A9448.jpg', 
                title: 'Kasteel Hoekelum 240324 Bennenkom 48A9448', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Kasteel-Hoekelum-240324-Bennenkom_48A9457.jpg', 
                title: 'Kasteel Hoekelum 240324 Bennenkom 48A9457', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Kasteel-Hoekelum-240324-Bennenkom_48A9475.jpg', 
                title: 'Kasteel Hoekelum 240324 Bennenkom 48A9475', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Loenermark-191123-Loenen_48A8936-Verbeterd-NR.jpg', 
                title: 'Loenermark 191123 Loenen 48A8936 Verbeterd NR', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Loenermark-191123-Loenen_48A8942.jpg', 
                title: 'Loenermark 191123 Loenen 48A8942', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Loenermark-191123-Loenen_48A8961.jpg', 
                title: 'Loenermark 191123 Loenen 48A8961', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Loenermark-191123-Loenen_48A8990.jpg', 
                title: 'Loenermark 191123 Loenen 48A8990', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Loenermark-191123-Loenen_48A8995.jpg', 
                title: 'Loenermark 191123 Loenen 48A8995', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Maasduinen-270725-Wellerlooi_48A1219.jpg', 
                title: 'Maasduinen 270725 Wellerlooi 48A1219', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Maasduinen-270725-Wellerlooi_48A1245.jpg', 
                title: 'Maasduinen 270725 Wellerlooi 48A1245', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Maasduinen-270725-Wellerlooi_48A1248.jpg', 
                title: 'Maasduinen 270725 Wellerlooi 48A1248', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Maasduinen-270725-Wellerlooi_48A1253.jpg', 
                title: 'Maasduinen 270725 Wellerlooi 48A1253', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Maasduinen-270725-Wellerlooi_48A1286.jpg', 
                title: 'Maasduinen 270725 Wellerlooi 48A1286', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Onzalige-bossen-260125-De-Steeg_48A0681.jpg', 
                title: 'Onzalige bossen 260125 De Steeg 48A0681', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Onzalige-bossen-260125-De-Steeg_48A0689.jpg', 
                title: 'Onzalige bossen 260125 De Steeg 48A0689', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Onzalige-bossen-260125-De-Steeg_48A0697.jpg', 
                title: 'Onzalige bossen 260125 De Steeg 48A0697', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Onzalige-bossen-260125-De-Steeg_48A0711.jpg', 
                title: 'Onzalige bossen 260125 De Steeg 48A0711', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Onzalige-bossen-260125-De-Steeg_48A0716.jpg', 
                title: 'Onzalige bossen 260125 De Steeg 48A0716', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Posbank-160225-De-Steeg_48A0733.jpg', 
                title: 'Posbank 160225 De Steeg 48A0733', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Posbank-160225-De-Steeg_48A0750.jpg', 
                title: 'Posbank 160225 De Steeg 48A0750', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Posbank-160225-De-Steeg_48A0755.jpg', 
                title: 'Posbank 160225 De Steeg 48A0755', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Posbank-160225-De-Steeg_48A0785.jpg', 
                title: 'Posbank 160225 De Steeg 48A0785', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Stad-290924-Den-Bosch_48A0466.jpg', 
                title: 'Stad 290924 Den Bosch 48A0466', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Stad-290924-Den-Bosch_48A0475.jpg', 
                title: 'Stad 290924 Den Bosch 48A0475', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Stad-290924-Den-Bosch_48A0485.jpg', 
                title: 'Stad 290924 Den Bosch 48A0485', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Stad-290924-Den-Bosch_48A0499.jpg', 
                title: 'Stad 290924 Den Bosch 48A0499', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Stad-290924-Den-Bosch_48A0501.jpg', 
                title: 'Stad 290924 Den Bosch 48A0501', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Stad-290924-Den-Bosch_48A0510.jpg', 
                title: 'Stad 290924 Den Bosch 48A0510', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Wekeromse-zand-250224-Wekerom_48A9240.jpg', 
                title: 'Wekeromse zand 250224 Wekerom 48A9240', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Wekeromse-zand-250224-Wekerom_48A9245.jpg', 
                title: 'Wekeromse zand 250224 Wekerom 48A9245', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Wekeromse-zand-250224-Wekerom_48A9248.jpg', 
                title: 'Wekeromse zand 250224 Wekerom 48A9248', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Wekeromse-zand-250224-Wekerom_48A9258.jpg', 
                title: 'Wekeromse zand 250224 Wekerom 48A9258', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Wekeromse-zand-250224-Wekerom_48A9264.jpg', 
                title: 'Wekeromse zand 250224 Wekerom 48A9264', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Wekeromse-zand-250224-Wekerom_48A9316.jpg', 
                title: 'Wekeromse zand 250224 Wekerom 48A9316', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/Wekeromse-zand-250224-Wekerom_MG_7875.jpg', 
                title: 'Wekeromse zand 250224 Wekerom MG 7875', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/burgers-zoo-230619-arnhem_mg_6683-1.jpg', 
                title: 'burgers zoo 230619 arnhem mg 6683 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/burgers-zoo-230619-arnhem_mg_6700-1.jpg', 
                title: 'burgers zoo 230619 arnhem mg 6700 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/burgers-zoo-230619-arnhem_mg_6723-1.jpg', 
                title: 'burgers zoo 230619 arnhem mg 6723 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/burgers-zoo-230619-arnhem_mg_6729-1.jpg', 
                title: 'burgers zoo 230619 arnhem mg 6729 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/burgers-zoo-230619-arnhem_mg_6758-1.jpg', 
                title: 'burgers zoo 230619 arnhem mg 6758 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/burgers-zoo-230619-arnhem_mg_6787-1.jpg', 
                title: 'burgers zoo 230619 arnhem mg 6787 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-140419-millingenwaard-_mg_6300-02.jpg', 
                title: 'zelfontspanners 140419 millingenwaard mg 6300 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-140419-millingenwaard-_mg_6315-2.jpg', 
                title: 'zelfontspanners 140419 millingenwaard mg 6315 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-140419-millingenwaard-_mg_6338-2.jpg', 
                title: 'zelfontspanners 140419 millingenwaard mg 6338 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-140419-millingenwaard-_mg_6373-2.jpg', 
                title: 'zelfontspanners 140419 millingenwaard mg 6373 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6470.jpg', 
                title: 'zelfontspanners 260519 buren mg 6470', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6501.jpg', 
                title: 'zelfontspanners 260519 buren mg 6501', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6511.jpg', 
                title: 'zelfontspanners 260519 buren mg 6511', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6524.jpg', 
                title: 'zelfontspanners 260519 buren mg 6524', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6526.jpg', 
                title: 'zelfontspanners 260519 buren mg 6526', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6547.jpg', 
                title: 'zelfontspanners 260519 buren mg 6547', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6553.jpg', 
                title: 'zelfontspanners 260519 buren mg 6553', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6558.jpg', 
                title: 'zelfontspanners 260519 buren mg 6558', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6561.jpg', 
                title: 'zelfontspanners 260519 buren mg 6561', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ron-cuppes/zelfontspanners-260519-buren-_mg_6566.jpg', 
                title: 'zelfontspanners 260519 buren mg 6566', 
                category: 'all' 
            }
        ]
    },

    'Rob Hendriks': {
        name: 'Rob Hendriks',
        photos: [
            { 
                src: 'images/portfolio/rob-hendriks/2025.jpg', 
                title: '2025', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/rob-hendriks/DSC09182.jpg', 
                title: 'DSC09182', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/rob-hendriks/DSC09207.jpg', 
                title: 'DSC09207', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/rob-hendriks/DSC09474-scaled.jpg', 
                title: 'DSC09474 scaled', 
                category: 'all' 
            }
        ]
    },

    'Renate van den Hoorn': {
        name: 'Renate van den Hoorn',
        photos: [
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20130728-_MG_9732.jpg', 
                title: '20130728 MG 9732', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20131017-_MG_1421.jpg', 
                title: '20131017 MG 1421', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20150805-_MG_7813.jpg', 
                title: '20150805 MG 7813', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20151022-_MG_0472.jpg', 
                title: '20151022 MG 0472', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20160215-_MG_1933.jpg', 
                title: '20160215 MG 1933', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20160501-P1070092.jpg', 
                title: '20160501 P1070092', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20160715-_MG_3376.jpg', 
                title: '20160715 MG 3376', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20160807-P1070464.jpg', 
                title: '20160807 P1070464', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20161214-_MG_5926.jpg', 
                title: '20161214 MG 5926', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170326-_MG_7053.jpg', 
                title: '20170326 MG 7053', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170523-_MG_7537.jpg', 
                title: '20170523 MG 7537', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170526-_MG_7556.jpg', 
                title: '20170526 MG 7556', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170611-_MG_7682.jpg', 
                title: '20170611 MG 7682', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170630-_MG_7744.jpg', 
                title: '20170630 MG 7744', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170630-_MG_7770.jpg', 
                title: '20170630 MG 7770', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170709-_MG_8016.jpg', 
                title: '20170709 MG 8016', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170715-_MG_8124.jpg', 
                title: '20170715 MG 8124', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170721-_MG_8225.jpg', 
                title: '20170721 MG 8225', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170724-_MG_8289.jpg', 
                title: '20170724 MG 8289', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170726-_MG_8388.jpg', 
                title: '20170726 MG 8388', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170731-_MG_8589.jpg', 
                title: '20170731 MG 8589', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170801-_MG_8671.jpg', 
                title: '20170801 MG 8671', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170801-_MG_8747.jpg', 
                title: '20170801 MG 8747', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170804-_MG_8791.jpg', 
                title: '20170804 MG 8791', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170805-_MG_8859.jpg', 
                title: '20170805 MG 8859', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170805-_MG_8910.jpg', 
                title: '20170805 MG 8910', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170806-_MG_9102.jpg', 
                title: '20170806 MG 9102', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170806-_MG_9104.jpg', 
                title: '20170806 MG 9104', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170806-_MG_9111.jpg', 
                title: '20170806 MG 9111', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170806-_MG_9146.jpg', 
                title: '20170806 MG 9146', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170807-_MG_9173.jpg', 
                title: '20170807 MG 9173', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170809-_MG_9251.jpg', 
                title: '20170809 MG 9251', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170809-_MG_9283.jpg', 
                title: '20170809 MG 9283', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170810-P1080602.jpg', 
                title: '20170810 P1080602', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170920-_MG_9707.jpg', 
                title: '20170920 MG 9707', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20170924-_MG_9984.jpg', 
                title: '20170924 MG 9984', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20171008-_MG_0190.jpg', 
                title: '20171008 MG 0190', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20171008-_MG_0197.jpg', 
                title: '20171008 MG 0197', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20171014-_MG_0223.jpg', 
                title: '20171014 MG 0223', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20171119-_MG_0934.jpg', 
                title: '20171119 MG 0934', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20171119-_MG_0951.jpg', 
                title: '20171119 MG 0951', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20180420-_MG_2390.jpg', 
                title: '20180420 MG 2390', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20180422-_MG_2438.jpg', 
                title: '20180422 MG 2438', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20180422-_MG_2459.jpg', 
                title: '20180422 MG 2459', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20180422-_MG_2464.jpg', 
                title: '20180422 MG 2464', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20180527-_MG_3097.jpg', 
                title: '20180527 MG 3097', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20181118-_MG_5575.jpg', 
                title: '20181118 MG 5575', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20181118-_MG_5588.jpg', 
                title: '20181118 MG 5588', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20191014-_MG_7759.jpg', 
                title: '20191014 MG 7759', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20191014-_MG_7765.jpg', 
                title: '20191014 MG 7765', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20191215-_MG_8309.jpg', 
                title: '20191215 MG 8309', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20191215-_MG_8341.jpg', 
                title: '20191215 MG 8341', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20191215-_MG_8399.jpg', 
                title: '20191215 MG 8399', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20191215-_MG_8412.jpg', 
                title: '20191215 MG 8412', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20191215-_MG_8437.jpg', 
                title: '20191215 MG 8437', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250320-_57A9584-2.jpg', 
                title: '20250320 57A9584 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250321-_57A9668.jpg', 
                title: '20250321 57A9668', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250321-_57A9685.jpg', 
                title: '20250321 57A9685', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250323-_57A9804.jpg', 
                title: '20250323 57A9804', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250323-_57A9818.jpg', 
                title: '20250323 57A9818', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250327-_57A9952.jpg', 
                title: '20250327 57A9952', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250824-_57A3525.jpg', 
                title: '20250824 57A3525', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250824-_57A3538.jpg', 
                title: '20250824 57A3538', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250824-_57A3552.jpg', 
                title: '20250824 57A3552', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250824-_57A3573.jpg', 
                title: '20250824 57A3573', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250902-_57A3713.jpg', 
                title: '20250902 57A3713', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250928-_57A4434.jpg', 
                title: '20250928 57A4434', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250928-_57A4455.jpg', 
                title: '20250928 57A4455', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250928-_57A4460.jpg', 
                title: '20250928 57A4460', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250928-_57A4483.jpg', 
                title: '20250928 57A4483', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20250928-_57A4522.jpg', 
                title: '20250928 57A4522', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20251026-_57A5526.jpg', 
                title: '20251026 57A5526', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20251026-_57A5535.jpg', 
                title: '20251026 57A5535', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20251026-_57A5542.jpg', 
                title: '20251026 57A5542', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20251026-_57A5563.jpg', 
                title: '20251026 57A5563', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/20251026-_57A5576.jpg', 
                title: '20251026 57A5576', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/P1010938-kopie-bew-3.jpg', 
                title: 'P1010938 kopie bew 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/renate-van-den-hoorn/aP1020587-bewerktkopie.jpg', 
                title: 'aP1020587 bewerktkopie', 
                category: 'all' 
            }
        ]
    },

    'Plony Bos': {
        name: 'Plony Bos',
        photos: [
            { 
                src: 'images/portfolio/plony-bos/DSC5751.jpg', 
                title: 'DSC5751', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/plony-bos/DSC5752.jpg', 
                title: 'DSC5752', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/plony-bos/DSC5759.jpg', 
                title: 'DSC5759', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/plony-bos/DSC5760.jpg', 
                title: 'DSC5760', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/plony-bos/DSC5784.jpg', 
                title: 'DSC5784', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/plony-bos/DSC5793.jpg', 
                title: 'DSC5793', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/plony-bos/DSC5814.jpg', 
                title: 'DSC5814', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/plony-bos/DSC5819.jpg', 
                title: 'DSC5819', 
                category: 'all' 
            }
        ]
    },

    'Marlies Reimering': {
        name: 'Marlies Reimering',
        photos: [
            { 
                src: 'images/portfolio/marlies-reimering/1-0136-3.jpg', 
                title: '1 0136 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-0340.jpg', 
                title: '1 0340', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-0448.jpg', 
                title: '1 0448', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-0586.jpg', 
                title: '1 0586', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-0599.jpg', 
                title: '1 0599', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-1934.jpg', 
                title: '1 1934', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-2780.jpg', 
                title: '1 2780', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-4099.jpg', 
                title: '1 4099', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-4104.jpg', 
                title: '1 4104', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-4481.jpg', 
                title: '1 4481', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-5927.jpg', 
                title: '1 5927', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/1-8642-3.jpg', 
                title: '1 8642 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/2macrozomer19b.jpg', 
                title: '2macrozomer19b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/3macroherfst19.jpg', 
                title: '3macroherfst19', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_0371-2.jpg', 
                title: 'DSC 0371 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_0386a.jpg', 
                title: 'DSC 0386a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_0474_03.JPG', 
                title: 'DSC 0474 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_0755-2.jpg', 
                title: 'DSC 0755 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_1103-2.jpg', 
                title: 'DSC 1103 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_1110-2.jpg', 
                title: 'DSC 1110 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_1115-2.jpg', 
                title: 'DSC 1115 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_1158-2.jpg', 
                title: 'DSC 1158 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_1451-3.jpg', 
                title: 'DSC 1451 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_2535-2.jpg', 
                title: 'DSC 2535 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_2545-2.jpg', 
                title: 'DSC 2545 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_2554-2.jpg', 
                title: 'DSC 2554 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3186-3.jpg', 
                title: 'DSC 3186 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3754.jpg', 
                title: 'DSC 3754', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3764-2.jpg', 
                title: 'DSC 3764 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3781.jpg', 
                title: 'DSC 3781', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3786.jpg', 
                title: 'DSC 3786', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3803.jpg', 
                title: 'DSC 3803', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3804.jpg', 
                title: 'DSC 3804', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3853.jpg', 
                title: 'DSC 3853', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3872-2.jpg', 
                title: 'DSC 3872 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_3895-2.jpg', 
                title: 'DSC 3895 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_4565-2.jpg', 
                title: 'DSC 4565 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_5812-2.jpg', 
                title: 'DSC 5812 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_6379.jpg', 
                title: 'DSC 6379', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_6386.jpg', 
                title: 'DSC 6386', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_6427-kopie.jpg', 
                title: 'DSC 6427 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_6440-2.jpg', 
                title: 'DSC 6440 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_6456.jpg', 
                title: 'DSC 6456', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_6647-2.jpg', 
                title: 'DSC 6647 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/DSC_7503.jpg', 
                title: 'DSC 7503', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/IMG_0290-2.jpg', 
                title: 'IMG 0290 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/architectuur19a.jpg', 
                title: 'architectuur19a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/architectuur19b.jpg', 
                title: 'architectuur19b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/architectuur20c.jpg', 
                title: 'architectuur20c', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/hatertsevennen19a.jpg', 
                title: 'hatertsevennen19a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/hatertsevennen19c.jpg', 
                title: 'hatertsevennen19c', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/vlissingen19a.jpg', 
                title: 'vlissingen19a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/marlies-reimering/vlissingen19b.jpg', 
                title: 'vlissingen19b', 
                category: 'all' 
            }
        ]
    },

    'Lize Dekkers': {
        name: 'Lize Dekkers',
        photos: [
            { 
                src: 'images/portfolio/lize-dekkers/DSC_0026.JPG', 
                title: 'DSC 0026', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/lize-dekkers/DSC_0031.JPG', 
                title: 'DSC 0031', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/lize-dekkers/DSC_0063.JPG', 
                title: 'DSC 0063', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/lize-dekkers/DSC_0070.JPG', 
                title: 'DSC 0070', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/lize-dekkers/DSC_0086.JPG', 
                title: 'DSC 0086', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/lize-dekkers/DSC_0137.JPG', 
                title: 'DSC 0137', 
                category: 'all' 
            }
        ]
    },

    'Karin Kruithof': {
        name: 'Karin Kruithof',
        photos: [
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1173_bewerkt.jpg', 
                title: '0F8A1173 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1216_gecropt.jpg', 
                title: '0F8A1216 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1225.JPG', 
                title: '0F8A1225', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1228_gecropt.jpg', 
                title: '0F8A1228 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1276_bewerkt.jpg', 
                title: '0F8A1276 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1568_gecropt.jpg', 
                title: '0F8A1568 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1587_gecropt.JPG', 
                title: '0F8A1587 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1618_gecropt.JPG', 
                title: '0F8A1618 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1694_gecropt.jpg', 
                title: '0F8A1694 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1717_gecropt.JPG', 
                title: '0F8A1717 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1737_gecropt.JPG', 
                title: '0F8A1737 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1781_gecropt.JPG', 
                title: '0F8A1781 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1828_gecropt.JPG', 
                title: '0F8A1828 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A1915_gecropt.JPG', 
                title: '0F8A1915 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/0F8A2083_gecropt.JPG', 
                title: '0F8A2083 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/1_IMG_2535_crop.JPG', 
                title: '1 IMG 2535 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Astrid.JPG', 
                title: 'Astrid', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Bolletjes.JPG', 
                title: 'Bolletjes', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Bonte-strandloper.JPG', 
                title: 'Bonte strandloper', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Bril.JPG', 
                title: 'Bril', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Dauwkunst.JPG', 
                title: 'Dauwkunst', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Dorst.JPG', 
                title: 'Dorst', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Foto-afdrukken-Karin-Kruithof-A-Custom-1.jpg', 
                title: 'Foto afdrukken Karin Kruithof A Custom 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Foto-afdrukken-Karin-Kruithof-B-Custom-1.jpg', 
                title: 'Foto afdrukken Karin Kruithof B Custom 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Geen-kool-wel-witje.JPG', 
                title: 'Geen kool wel witje', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Gezellig.JPG', 
                title: 'Gezellig', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_1896.JPG', 
                title: 'IMG 1896', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_1972_bewerkt.jpg', 
                title: 'IMG 1972 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_1985.JPG', 
                title: 'IMG 1985', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_1989.JPG', 
                title: 'IMG 1989', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2055_bewerkt2.jpg', 
                title: 'IMG 2055 bewerkt2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2067.JPG', 
                title: 'IMG 2067', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2104_bewerkt.jpg', 
                title: 'IMG 2104 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2110_bewerkt.jpg', 
                title: 'IMG 2110 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2119_bewerkt.jpg', 
                title: 'IMG 2119 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2132_bewerkt.jpg', 
                title: 'IMG 2132 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2164.JPG', 
                title: 'IMG 2164', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2174.JPG', 
                title: 'IMG 2174', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2194.JPG', 
                title: 'IMG 2194', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2221.JPG', 
                title: 'IMG 2221', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2308.JPG', 
                title: 'IMG 2308', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2318.JPG', 
                title: 'IMG 2318', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2324.JPG', 
                title: 'IMG 2324', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2488_crop.JPG', 
                title: 'IMG 2488 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2515_crop.JPG', 
                title: 'IMG 2515 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2526_crop.JPG', 
                title: 'IMG 2526 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2528_crop.JPG', 
                title: 'IMG 2528 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2535_crop.JPG', 
                title: 'IMG 2535 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2541_crop_bw.JPG', 
                title: 'IMG 2541 crop bw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2571_crop.JPG', 
                title: 'IMG 2571 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2603_crop.JPG', 
                title: 'IMG 2603 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2635_crop.jpg', 
                title: 'IMG 2635 crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2673.JPG', 
                title: 'IMG 2673', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2683-gecropt.JPG', 
                title: 'IMG 2683 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2700.JPG', 
                title: 'IMG 2700', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2776-gecropt.JPG', 
                title: 'IMG 2776 gecropt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2778.JPG', 
                title: 'IMG 2778', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2781.JPG', 
                title: 'IMG 2781', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2782.JPG', 
                title: 'IMG 2782', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2788.JPG', 
                title: 'IMG 2788', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2806.JPG', 
                title: 'IMG 2806', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2819.JPG', 
                title: 'IMG 2819', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2828-kopie.JPG', 
                title: 'IMG 2828 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2849-kopie_bw.JPG', 
                title: 'IMG 2849 kopie bw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2851-kopie_bw.JPG', 
                title: 'IMG 2851 kopie bw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2854-kopie.JPG', 
                title: 'IMG 2854 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2871-kopie_bw.JPG', 
                title: 'IMG 2871 kopie bw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2882-kopie_bw.JPG', 
                title: 'IMG 2882 kopie bw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2889-kopie.JPG', 
                title: 'IMG 2889 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2905-kopie_bw.JPG', 
                title: 'IMG 2905 kopie bw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2910-kopie.JPG', 
                title: 'IMG 2910 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2921-kopie_bw.JPG', 
                title: 'IMG 2921 kopie bw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2982-silhouet.JPG', 
                title: 'IMG 2982 silhouet', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_2991-aan-een-zijden-draadje.JPG', 
                title: 'IMG 2991 aan een zijden draadje', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_3001-in-het-zonnetje-gezet.JPG', 
                title: 'IMG 3001 in het zonnetje gezet', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_3045-tweeling.JPG', 
                title: 'IMG 3045 tweeling', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_3069-spiderwoman.JPG', 
                title: 'IMG 3069 spiderwoman', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_3104-oeps.-betrapt.JPG', 
                title: 'IMG 3104 oeps. betrapt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_3118-weidebeekjuffer.JPG', 
                title: 'IMG 3118 weidebeekjuffer', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_3133-beekje.JPG', 
                title: 'IMG 3133 beekje', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_3147-opgerolde-Brede-kronkel.JPG', 
                title: 'IMG 3147 opgerolde Brede kronkel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/IMG_3153-reflectie.JPG', 
                title: 'IMG 3153 reflectie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/P1001430.JPG', 
                title: 'P1001430', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Rozenmos-galwesp.JPG', 
                title: 'Rozenmos galwesp', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/Spiegeling.JPG', 
                title: 'Spiegeling', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/druppels.jpg', 
                title: 'druppels', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/galop.jpg', 
                title: 'galop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/klaar-om-te-duiken.JPG', 
                title: 'klaar om te duiken', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/onderzoek.JPG', 
                title: 'onderzoek', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/paddoos.JPG', 
                title: 'paddoos', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/patroon.jpg', 
                title: 'patroon', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/rood.jpg', 
                title: 'rood', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/spin.JPG', 
                title: 'spin', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/springstaartje.JPG', 
                title: 'springstaartje', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kruithof/woestijn.jpg', 
                title: 'woestijn', 
                category: 'all' 
            }
        ]
    },

    'Karin Kalmar': {
        name: 'Karin Kalmar',
        photos: [
            { 
                src: 'images/portfolio/karin-kalmar/1_Hemelse-berg-2538.jpg', 
                title: '1 Hemelse berg 2538', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/1_Hemelse-berg-2547.jpg', 
                title: '1 Hemelse berg 2547', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/1_Hemelse-berg-2605.jpg', 
                title: '1 Hemelse berg 2605', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/1_Hemelse-berg-2710.jpg', 
                title: '1 Hemelse berg 2710', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/2_Hemelse-berg-2538.jpg', 
                title: '2 Hemelse berg 2538', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/2_Hemelse-berg-2547.jpg', 
                title: '2 Hemelse berg 2547', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/2_Hemelse-berg-2710.jpg', 
                title: '2 Hemelse berg 2710', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Belmonte-Arboretum-4737.jpg', 
                title: 'Belmonte Arboretum 4737', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Belmonte-Arboretum-4787.jpg', 
                title: 'Belmonte Arboretum 4787', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Belmonte-Arboretum-4820.jpg', 
                title: 'Belmonte Arboretum 4820', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Belmonte-Arboretum-4841.jpg', 
                title: 'Belmonte Arboretum 4841', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Belmonte-Arboretum-4852.jpg', 
                title: 'Belmonte Arboretum 4852', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Belmonte-Arboretum-4853.jpg', 
                title: 'Belmonte Arboretum 4853', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Belmonte-Arboretum-4895.jpg', 
                title: 'Belmonte Arboretum 4895', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Belmonte-Arboretum-4904.jpg', 
                title: 'Belmonte Arboretum 4904', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Binnenveldse-Hooilanden-Bennekom-3468.jpg', 
                title: 'Binnenveldse Hooilanden Bennekom 3468', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Binnenveldse-Hooilanden-Bennekom-3509.jpg', 
                title: 'Binnenveldse Hooilanden Bennekom 3509', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Binnenveldse-Hooilanden-Bennekom-3570.jpg', 
                title: 'Binnenveldse Hooilanden Bennekom 3570', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Binnenveldse-Hooilanden-Bennekom-3606.jpg', 
                title: 'Binnenveldse Hooilanden Bennekom 3606', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Binnenveldse-Hooilanden-Bennekom-3644.jpg', 
                title: 'Binnenveldse Hooilanden Bennekom 3644', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_0071.JPG', 
                title: 'DSC 0071', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_0075-klein.jpg', 
                title: 'DSC 0075 klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_0141-small.JPG', 
                title: 'DSC 0141 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_0143-Small.JPG', 
                title: 'DSC 0143 Small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_0174-small.JPG', 
                title: 'DSC 0174 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_0208.JPG', 
                title: 'DSC 0208', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_0313-small.JPG', 
                title: 'DSC 0313 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_0452-small.JPG', 
                title: 'DSC 0452 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_2177.JPG', 
                title: 'DSC 2177', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_2238.JPG', 
                title: 'DSC 2238', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_2307-2.JPG', 
                title: 'DSC 2307 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_2344.JPG', 
                title: 'DSC 2344', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3194.JPG', 
                title: 'DSC 3194', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3203-2.JPG', 
                title: 'DSC 3203 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3248.JPG', 
                title: 'DSC 3248', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3258.JPG', 
                title: 'DSC 3258', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3262.JPG', 
                title: 'DSC 3262', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3265.JPG', 
                title: 'DSC 3265', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3299.JPG', 
                title: 'DSC 3299', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3318-2.JPG', 
                title: 'DSC 3318 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3328.JPG', 
                title: 'DSC 3328', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3345.JPG', 
                title: 'DSC 3345', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_3346.JPG', 
                title: 'DSC 3346', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4859.jpg', 
                title: 'DSC 4859', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4887.jpg', 
                title: 'DSC 4887', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4895.jpg', 
                title: 'DSC 4895', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4897.jpg', 
                title: 'DSC 4897', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4902.jpg', 
                title: 'DSC 4902', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4930.jpg', 
                title: 'DSC 4930', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4931.jpg', 
                title: 'DSC 4931', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4957.jpg', 
                title: 'DSC 4957', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4966.jpg', 
                title: 'DSC 4966', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_4994.jpg', 
                title: 'DSC 4994', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_5033.jpg', 
                title: 'DSC 5033', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_5834.JPG', 
                title: 'DSC 5834', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_5878-2.JPG', 
                title: 'DSC 5878 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_5898.JPG', 
                title: 'DSC 5898', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_5926.JPG', 
                title: 'DSC 5926', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_6017-2.JPG', 
                title: 'DSC 6017 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_8627-small.JPG', 
                title: 'DSC 8627 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_8660-small.JPG', 
                title: 'DSC 8660 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_8737-small.JPG', 
                title: 'DSC 8737 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_9022-small.JPG', 
                title: 'DSC 9022 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_9465-small.JPG', 
                title: 'DSC 9465 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/DSC_9715-small.JPG', 
                title: 'DSC 9715 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6528.jpg', 
                title: 'Den Bosch 6528', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6531.jpg', 
                title: 'Den Bosch 6531', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6535.jpg', 
                title: 'Den Bosch 6535', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6537a.jpg', 
                title: 'Den Bosch 6537a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6578.jpg', 
                title: 'Den Bosch 6578', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6590.jpg', 
                title: 'Den Bosch 6590', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6622.jpg', 
                title: 'Den Bosch 6622', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6644.jpg', 
                title: 'Den Bosch 6644', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6659.jpg', 
                title: 'Den Bosch 6659', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6677.jpg', 
                title: 'Den Bosch 6677', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6720.jpg', 
                title: 'Den Bosch 6720', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Den-Bosch-6741.jpg', 
                title: 'Den Bosch 6741', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Foto-afdrukken-Karin-Kalmar-Custom.jpg', 
                title: 'Foto afdrukken Karin Kalmar Custom', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2512.jpg', 
                title: 'Hemelse berg 2512', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2534.jpg', 
                title: 'Hemelse berg 2534', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2538.jpg', 
                title: 'Hemelse berg 2538', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2541.jpg', 
                title: 'Hemelse berg 2541', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2547.jpg', 
                title: 'Hemelse berg 2547', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2551.jpg', 
                title: 'Hemelse berg 2551', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2553.jpg', 
                title: 'Hemelse berg 2553', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2575.jpg', 
                title: 'Hemelse berg 2575', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2580.jpg', 
                title: 'Hemelse berg 2580', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2605.jpg', 
                title: 'Hemelse berg 2605', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2614.jpg', 
                title: 'Hemelse berg 2614', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2629.jpg', 
                title: 'Hemelse berg 2629', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2632.jpg', 
                title: 'Hemelse berg 2632', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2633.jpg', 
                title: 'Hemelse berg 2633', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2691.jpg', 
                title: 'Hemelse berg 2691', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2710.jpg', 
                title: 'Hemelse berg 2710', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2714.jpg', 
                title: 'Hemelse berg 2714', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg-2715.jpg', 
                title: 'Hemelse berg 2715', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Hemelse-berg.a-2642.jpg', 
                title: 'Hemelse berg.a 2642', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Het-Quin-6770.jpg', 
                title: 'Het Quin 6770', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Het-Quin-6889.jpg', 
                title: 'Het Quin 6889', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Het-Quin-6902.jpg', 
                title: 'Het Quin 6902', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Het-Quin-6933.jpg', 
                title: 'Het Quin 6933', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Het-Quin-6945.jpg', 
                title: 'Het Quin 6945', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/IMG_3370-small.JPG', 
                title: 'IMG 3370 small', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Klotterpeel-6638.jpg', 
                title: 'Klotterpeel 6638', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Klotterpeel-6765.jpg', 
                title: 'Klotterpeel 6765', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Klotterpeel-6783.jpg', 
                title: 'Klotterpeel 6783', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Klotterpeel-6793.jpg', 
                title: 'Klotterpeel 6793', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Klotterpeel-6798.jpg', 
                title: 'Klotterpeel 6798', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Klotterpeel-6803.jpg', 
                title: 'Klotterpeel 6803', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Klotterpeel-6808.jpg', 
                title: 'Klotterpeel 6808', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kraaijenbergse-plassen-.jpg', 
                title: 'Kraaijenbergse plassen', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kraaijenbergse-plassen-1733.jpg', 
                title: 'Kraaijenbergse plassen 1733', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kraaijenbergse-plassen-1752.jpg', 
                title: 'Kraaijenbergse plassen 1752', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kraaijenbergse-plassen-1758.jpg', 
                title: 'Kraaijenbergse plassen 1758', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kraaijenbergse-plassen-1815.jpg', 
                title: 'Kraaijenbergse plassen 1815', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kroondomein-Apeldoorn-2268.jpg', 
                title: 'Kroondomein Apeldoorn 2268', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kroondomein-Apeldoorn-2328.jpg', 
                title: 'Kroondomein Apeldoorn 2328', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kroondomein-Apeldoorn-2375.jpg', 
                title: 'Kroondomein Apeldoorn 2375', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kroondomein-Apeldoorn-2403.jpg', 
                title: 'Kroondomein Apeldoorn 2403', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Kroondomein-Apeldoorn-2492.jpg', 
                title: 'Kroondomein Apeldoorn 2492', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Landgoed-Vrijland-8258.jpg', 
                title: 'Landgoed Vrijland 8258', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Landgoed-Vrijland-8276.jpg', 
                title: 'Landgoed Vrijland 8276', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Landgoed-Vrijland-8304.jpg', 
                title: 'Landgoed Vrijland 8304', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Landgoed-Vrijland-8342.jpg', 
                title: 'Landgoed Vrijland 8342', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Landgoed-Vrijland-8361.jpg', 
                title: 'Landgoed Vrijland 8361', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Loenen-1777.jpg', 
                title: 'Loenen 1777', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Loenen-1824.jpg', 
                title: 'Loenen 1824', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Loenen-1876.jpg', 
                title: 'Loenen 1876', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Loenen-1892.jpg', 
                title: 'Loenen 1892', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Loenen-1936.jpg', 
                title: 'Loenen 1936', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Onzalige-bossen-0670.jpg', 
                title: 'Onzalige bossen 0670', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Onzalige-bossen-0671.jpg', 
                title: 'Onzalige bossen 0671', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Onzalige-bossen-0718.jpg', 
                title: 'Onzalige bossen 0718', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Onzalige-bossen-0722.jpg', 
                title: 'Onzalige bossen 0722', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Onzalige-bossen-0757.jpg', 
                title: 'Onzalige bossen 0757', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Onzalige-bossen-0763.jpg', 
                title: 'Onzalige bossen 0763', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Planken-Wambuis-1786.jpg', 
                title: 'Planken Wambuis 1786', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Planken-Wambuis-1795.jpg', 
                title: 'Planken Wambuis 1795', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Planken-Wambuis-1929.jpg', 
                title: 'Planken Wambuis 1929', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Planken-Wambuis-2000.jpg', 
                title: 'Planken Wambuis 2000', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Planken-Wambuis-2046.jpg', 
                title: 'Planken Wambuis 2046', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Planken-Wambuis-8405.jpg', 
                title: 'Planken Wambuis 8405', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Planken-Wambuis-8414.jpg', 
                title: 'Planken Wambuis 8414', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5625.jpg', 
                title: 'Renkums Beekdal 5625', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5632.jpg', 
                title: 'Renkums Beekdal 5632', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5647.jpg', 
                title: 'Renkums Beekdal 5647', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5658.jpg', 
                title: 'Renkums Beekdal 5658', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5664.jpg', 
                title: 'Renkums Beekdal 5664', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5668.jpg', 
                title: 'Renkums Beekdal 5668', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5673.jpg', 
                title: 'Renkums Beekdal 5673', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5676.jpg', 
                title: 'Renkums Beekdal 5676', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5692.jpg', 
                title: 'Renkums Beekdal 5692', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5694.jpg', 
                title: 'Renkums Beekdal 5694', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5709.jpg', 
                title: 'Renkums Beekdal 5709', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5742.jpg', 
                title: 'Renkums Beekdal 5742', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Renkums-Beekdal-5743.jpg', 
                title: 'Renkums Beekdal 5743', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2810.jpg', 
                title: 'Rotterdam 2810', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2828.jpg', 
                title: 'Rotterdam 2828', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2829.jpg', 
                title: 'Rotterdam 2829', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2847.jpg', 
                title: 'Rotterdam 2847', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2865.jpg', 
                title: 'Rotterdam 2865', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2890.jpg', 
                title: 'Rotterdam 2890', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2895.jpg', 
                title: 'Rotterdam 2895', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2898.jpg', 
                title: 'Rotterdam 2898', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2902.jpg', 
                title: 'Rotterdam 2902', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2903.jpg', 
                title: 'Rotterdam 2903', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2907.jpg', 
                title: 'Rotterdam 2907', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2915.jpg', 
                title: 'Rotterdam 2915', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2917.jpg', 
                title: 'Rotterdam 2917', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2924.jpg', 
                title: 'Rotterdam 2924', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rotterdam-2928.jpg', 
                title: 'Rotterdam 2928', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rozendaaalse-veld-0055.jpg', 
                title: 'Rozendaaalse veld 0055', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rozendaaalse-veld-0069.jpg', 
                title: 'Rozendaaalse veld 0069', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rozendaaalse-veld-0087.jpg', 
                title: 'Rozendaaalse veld 0087', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rozendaaalse-veld-0089.jpg', 
                title: 'Rozendaaalse veld 0089', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Rozendaaalse-veld-0106.jpg', 
                title: 'Rozendaaalse veld 0106', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Siberische-grondeekhoorn-8560.jpg', 
                title: 'Siberische grondeekhoorn 8560', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Siberische-grondeekhoorn-8647.jpg', 
                title: 'Siberische grondeekhoorn 8647', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Siberische-grondeekhoorn-8681.jpg', 
                title: 'Siberische grondeekhoorn 8681', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Siberische-grondeekhoorn-8697.jpg', 
                title: 'Siberische grondeekhoorn 8697', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Siberische-grondeekhoorn-8732.jpg', 
                title: 'Siberische grondeekhoorn 8732', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Siberische-grondeekhoorn-8809.jpg', 
                title: 'Siberische grondeekhoorn 8809', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5127.jpg', 
                title: 'Stippelberg 5127', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5146.jpg', 
                title: 'Stippelberg 5146', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5164.jpg', 
                title: 'Stippelberg 5164', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5175.jpg', 
                title: 'Stippelberg 5175', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5181.jpg', 
                title: 'Stippelberg 5181', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5190.jpg', 
                title: 'Stippelberg 5190', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5196.jpg', 
                title: 'Stippelberg 5196', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5198.jpg', 
                title: 'Stippelberg 5198', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5213.jpg', 
                title: 'Stippelberg 5213', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Stippelberg-5232.jpg', 
                title: 'Stippelberg 5232', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wellerlooi-6411.jpg', 
                title: 'Wellerlooi 6411', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wellerlooi-6496.jpg', 
                title: 'Wellerlooi 6496', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wellerlooi-7842.jpg', 
                title: 'Wellerlooi 7842', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wellerlooi-7924.jpg', 
                title: 'Wellerlooi 7924', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wellerlooi-7926.jpg', 
                title: 'Wellerlooi 7926', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Weurt-9086.jpg', 
                title: 'Weurt 9086', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Weurt-9119.jpg', 
                title: 'Weurt 9119', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Weurt-9121.jpg', 
                title: 'Weurt 9121', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Weurt-9126.jpg', 
                title: 'Weurt 9126', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Weurt-9158.jpg', 
                title: 'Weurt 9158', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Weurt-9176.jpg', 
                title: 'Weurt 9176', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wolfsberg-1642.a.jpg', 
                title: 'Wolfsberg 1642.a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wolfsberg-1725.jpg', 
                title: 'Wolfsberg 1725', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wolfsberg-1736.jpg', 
                title: 'Wolfsberg 1736', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wolfsberg-1743.a.jpg', 
                title: 'Wolfsberg 1743.a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wolfsberg-1759.jpg', 
                title: 'Wolfsberg 1759', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/karin-kalmar/Wolfsberg-1805.jpg', 
                title: 'Wolfsberg 1805', 
                category: 'all' 
            }
        ]
    },

    'Jos Verleg': {
        name: 'Jos Verleg',
        photos: [
            { 
                src: 'images/portfolio/jos-verleg/0008766.jpg', 
                title: '0008766', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_1263.jpg', 
                title: 'DSC 1263', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_1379.jpg', 
                title: 'DSC 1379', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_1689.jpg', 
                title: 'DSC 1689', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_1700.jpg', 
                title: 'DSC 1700', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_1741.jpg', 
                title: 'DSC 1741', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_1742.jpg', 
                title: 'DSC 1742', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_1757.jpg', 
                title: 'DSC 1757', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_6658.jpg', 
                title: 'DSC 6658', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_9184.jpg', 
                title: 'DSC 9184', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_9399.jpg', 
                title: 'DSC 9399', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_9410.jpg', 
                title: 'DSC 9410', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_9418.jpg', 
                title: 'DSC 9418', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_9423.jpg', 
                title: 'DSC 9423', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-verleg/DSC_9426.jpg', 
                title: 'DSC 9426', 
                category: 'all' 
            }
        ]
    },

    'Jos de Vaan': {
        name: 'Jos de Vaan',
        photos: [
            { 
                src: 'images/portfolio/jos-de-vaan/De-Kaaij-voor-Dekker-vd-Vegt.jpg', 
                title: 'De Kaaij voor Dekker vd Vegt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_0078.JPG', 
                title: 'IMG 0078', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_0986-1.jpg', 
                title: 'IMG 0986 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_1004A-1.jpg', 
                title: 'IMG 1004A 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_1063-1.jpg', 
                title: 'IMG 1063 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_1119-1.jpg', 
                title: 'IMG 1119 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_1181-1.jpg', 
                title: 'IMG 1181 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2189a.jpg', 
                title: 'IMG 2189a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2200a.jpg', 
                title: 'IMG 2200a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2206a.jpg', 
                title: 'IMG 2206a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2232a.jpg', 
                title: 'IMG 2232a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2614_resultaat.JPG', 
                title: 'IMG 2614 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2623_resultaat.JPG', 
                title: 'IMG 2623 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2634_resultaat.JPG', 
                title: 'IMG 2634 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2636_resultaat.JPG', 
                title: 'IMG 2636 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2670_resultaat.JPG', 
                title: 'IMG 2670 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2684_resultaat.JPG', 
                title: 'IMG 2684 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2694_resultaat.JPG', 
                title: 'IMG 2694 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2739_resultaat.JPG', 
                title: 'IMG 2739 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2763_resultaat.JPG', 
                title: 'IMG 2763 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_2772_resultaat.JPG', 
                title: 'IMG 2772 resultaat', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3621.JPG', 
                title: 'IMG 3621', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3632.JPG', 
                title: 'IMG 3632', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3634.JPG', 
                title: 'IMG 3634', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3664.JPG', 
                title: 'IMG 3664', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3670.JPG', 
                title: 'IMG 3670', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3681.JPG', 
                title: 'IMG 3681', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3689.JPG', 
                title: 'IMG 3689', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3694.JPG', 
                title: 'IMG 3694', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_3702.JPG', 
                title: 'IMG 3702', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_5812.JPG', 
                title: 'IMG 5812', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_5818.JPG', 
                title: 'IMG 5818', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_5826.JPG', 
                title: 'IMG 5826', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_5898.JPG', 
                title: 'IMG 5898', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_5908.JPG', 
                title: 'IMG 5908', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_9865.JPG', 
                title: 'IMG 9865', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_9906.JPG', 
                title: 'IMG 9906', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/IMG_9920.JPG', 
                title: 'IMG 9920', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/img_6178.png', 
                title: 'img 6178', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/img_6198.png', 
                title: 'img 6198', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/img_6201.png', 
                title: 'img 6201', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/img_6213.png', 
                title: 'img 6213', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/jos-de-vaan/img_6285.png', 
                title: 'img 6285', 
                category: 'all' 
            }
        ]
    },

    'Inge Pfeil': {
        name: 'Inge Pfeil',
        photos: [
            { 
                src: 'images/portfolio/inge-pfeil/1_Inge-Pfeil-Hemelseberg-8.jpg', 
                title: '1 Inge Pfeil Hemelseberg 8', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/1_Inge-Pfeil-Hemelseberg-Robin.jpg', 
                title: '1 Inge Pfeil Hemelseberg Robin', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/2_Inge-Pfeil-Hemelseberg-2.jpg', 
                title: '2 Inge Pfeil Hemelseberg 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/2_Inge-Pfeil-Hemelseberg-3.jpg', 
                title: '2 Inge Pfeil Hemelseberg 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/2_Inge-Pfeil-Hemelseberg-4.jpg', 
                title: '2 Inge Pfeil Hemelseberg 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/2_Inge-Pfeil-Hemelseberg-5.jpg', 
                title: '2 Inge Pfeil Hemelseberg 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/2_Inge-Pfeil-Hemelseberg-7.jpg', 
                title: '2 Inge Pfeil Hemelseberg 7', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/3_Inge-Pfeil-Hemelseberg-Robin-1.jpg', 
                title: '3 Inge Pfeil Hemelseberg Robin 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/4_Inge-Pfeil-Hemelseberg-1.jpg', 
                title: '4 Inge Pfeil Hemelseberg 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Belversven-1.jpg', 
                title: 'Inge Pfeil Belversven 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Belversven-2.jpg', 
                title: 'Inge Pfeil Belversven 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Belversven-3.jpg', 
                title: 'Inge Pfeil Belversven 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Belversven-4.jpg', 
                title: 'Inge Pfeil Belversven 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Belversven-5.jpg', 
                title: 'Inge Pfeil Belversven 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-1.jpg', 
                title: 'Inge Pfeil Residence Rhenen 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-10.jpg', 
                title: 'Inge Pfeil Residence Rhenen 10', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-2.jpg', 
                title: 'Inge Pfeil Residence Rhenen 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-3.jpg', 
                title: 'Inge Pfeil Residence Rhenen 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-4.jpg', 
                title: 'Inge Pfeil Residence Rhenen 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-5.jpg', 
                title: 'Inge Pfeil Residence Rhenen 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-6.jpg', 
                title: 'Inge Pfeil Residence Rhenen 6', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-7.jpg', 
                title: 'Inge Pfeil Residence Rhenen 7', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-8.jpg', 
                title: 'Inge Pfeil Residence Rhenen 8', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/inge-pfeil/Inge-Pfeil-Residence-Rhenen-9.jpg', 
                title: 'Inge Pfeil Residence Rhenen 9', 
                category: 'all' 
            }
        ]
    },

    'Ine Janssen': {
        name: 'Ine Janssen',
        photos: [
            { 
                src: 'images/portfolio/ine-janssen/1D4501EF-864D-4407-9A10-A8E3B2D6BC02.jpeg', 
                title: '1D4501EF 864D 4407 9A10 A8E3B2D6BC02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0009.jpg', 
                title: '1 IMG 0009', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0010.jpg', 
                title: '1 IMG 0010', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0026-1.jpg', 
                title: '1 IMG 0026 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0037.jpg', 
                title: '1 IMG 0037', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0038.jpg', 
                title: '1 IMG 0038', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0039-1.jpg', 
                title: '1 IMG 0039 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0053.jpg', 
                title: '1 IMG 0053', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0058.jpg', 
                title: '1 IMG 0058', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0081.jpg', 
                title: '1 IMG 0081', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0091.jpg', 
                title: '1 IMG 0091', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0098.jpg', 
                title: '1 IMG 0098', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0099.jpg', 
                title: '1 IMG 0099', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0109-1.jpg', 
                title: '1 IMG 0109 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0111-1.jpg', 
                title: '1 IMG 0111 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/1_IMG_0121.jpg', 
                title: '1 IMG 0121', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0025-Kopie.jpg', 
                title: '20171210 IMG 0025 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0028-Kopie.jpg', 
                title: '20171210 IMG 0028 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0032-Kopie.jpg', 
                title: '20171210 IMG 0032 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0033-Kopie.jpg', 
                title: '20171210 IMG 0033 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0036-Kopie.jpg', 
                title: '20171210 IMG 0036 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0040-Kopie.jpg', 
                title: '20171210 IMG 0040 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0046-bewerkt-Kopie.jpg', 
                title: '20171210 IMG 0046 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0050-Kopie.jpg', 
                title: '20171210 IMG 0050 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0054-Kopie.jpg', 
                title: '20171210 IMG 0054 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0059-Kopie.jpg', 
                title: '20171210 IMG 0059 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0060-Kopie.jpg', 
                title: '20171210 IMG 0060 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0062-Kopie.jpg', 
                title: '20171210 IMG 0062 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0066-Kopie.jpg', 
                title: '20171210 IMG 0066 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0068-Kopie.jpg', 
                title: '20171210 IMG 0068 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0071-Kopie.jpg', 
                title: '20171210 IMG 0071 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0073-Kopie.jpg', 
                title: '20171210 IMG 0073 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0077-Kopie.jpg', 
                title: '20171210 IMG 0077 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0078-Kopie.jpg', 
                title: '20171210 IMG 0078 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0081-Kopie.jpg', 
                title: '20171210 IMG 0081 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0087-Kopie.jpg', 
                title: '20171210 IMG 0087 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0095-bewerkt-Kopie.jpg', 
                title: '20171210 IMG 0095 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0098-Kopie.jpg', 
                title: '20171210 IMG 0098 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0099-bewerkt-Kopie.jpg', 
                title: '20171210 IMG 0099 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0100-Kopie.jpg', 
                title: '20171210 IMG 0100 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0101-Kopie.jpg', 
                title: '20171210 IMG 0101 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0103-Kopie.jpg', 
                title: '20171210 IMG 0103 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0104-Kopie.jpg', 
                title: '20171210 IMG 0104 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0108-Kopie.jpg', 
                title: '20171210 IMG 0108 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0109-Kopie.jpg', 
                title: '20171210 IMG 0109 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0133-Kopie.jpg', 
                title: '20171210 IMG 0133 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0136-Kopie.jpg', 
                title: '20171210 IMG 0136 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0141-Kopie.jpg', 
                title: '20171210 IMG 0141 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0142-Kopie.jpg', 
                title: '20171210 IMG 0142 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0143-Kopie.jpg', 
                title: '20171210 IMG 0143 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0146-Kopie.jpg', 
                title: '20171210 IMG 0146 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0147-Kopie.jpg', 
                title: '20171210 IMG 0147 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0148-Kopie.jpg', 
                title: '20171210 IMG 0148 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0150-Kopie.jpg', 
                title: '20171210 IMG 0150 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0152-Kopie.jpg', 
                title: '20171210 IMG 0152 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0153-Kopie.jpg', 
                title: '20171210 IMG 0153 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0158-Kopie.jpg', 
                title: '20171210 IMG 0158 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0160-Kopie.jpg', 
                title: '20171210 IMG 0160 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0164-Kopie.jpg', 
                title: '20171210 IMG 0164 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0166-Kopie.jpg', 
                title: '20171210 IMG 0166 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0167-Kopie.jpg', 
                title: '20171210 IMG 0167 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0169-Kopie.jpg', 
                title: '20171210 IMG 0169 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0171-Kopie.jpg', 
                title: '20171210 IMG 0171 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0173-Kopie.jpg', 
                title: '20171210 IMG 0173 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0177-Kopie.jpg', 
                title: '20171210 IMG 0177 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0178-Kopie.jpg', 
                title: '20171210 IMG 0178 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0179-Kopie.jpg', 
                title: '20171210 IMG 0179 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0182-bewerkt-Kopie.jpg', 
                title: '20171210 IMG 0182 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0186-bewerkt-Kopie.jpg', 
                title: '20171210 IMG 0186 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20171210-IMG_0188-Kopie-1.jpg', 
                title: '20171210 IMG 0188 Kopie 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180527-IMG_0028-Kopie.jpg', 
                title: '20180527 IMG 0028 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180527-IMG_0086-Kopie.jpg', 
                title: '20180527 IMG 0086 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180527-IMG_0095-Kopie.jpg', 
                title: '20180527 IMG 0095 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180527-IMG_0105-Kopie.jpg', 
                title: '20180527 IMG 0105 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180527-IMG_0129-Kopie.jpg', 
                title: '20180527 IMG 0129 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0023-Kopie.jpg', 
                title: '20180630 IMG 0023 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0028-bewerkt.jpg', 
                title: '20180630 IMG 0028 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0032-Kopie.jpg', 
                title: '20180630 IMG 0032 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0052-Kopie.jpg', 
                title: '20180630 IMG 0052 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0057-bewerkt-Kopie.jpg', 
                title: '20180630 IMG 0057 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0062-bewerkt-Kopie.jpg', 
                title: '20180630 IMG 0062 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0076-Kopie.jpg', 
                title: '20180630 IMG 0076 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0110-bewerkt-Kopie.jpg', 
                title: '20180630 IMG 0110 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0125-Kopie.jpg', 
                title: '20180630 IMG 0125 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0143-bewerkt-Kopie.jpg', 
                title: '20180630 IMG 0143 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0157-Kopie.jpg', 
                title: '20180630 IMG 0157 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0165-Kopie.jpg', 
                title: '20180630 IMG 0165 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0173-Kopie.jpg', 
                title: '20180630 IMG 0173 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0175-Kopie.jpg', 
                title: '20180630 IMG 0175 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0179-Kopie.jpg', 
                title: '20180630 IMG 0179 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0215-Kopie.jpg', 
                title: '20180630 IMG 0215 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0233-Kopie.jpg', 
                title: '20180630 IMG 0233 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0267-Kopie.jpg', 
                title: '20180630 IMG 0267 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0291-Kopie.jpg', 
                title: '20180630 IMG 0291 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0312-Kopie.jpg', 
                title: '20180630 IMG 0312 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0338-Kopie.jpg', 
                title: '20180630 IMG 0338 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0360-Kopie.jpg', 
                title: '20180630 IMG 0360 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180630-IMG_0393-Kopie.jpg', 
                title: '20180630 IMG 0393 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0019-Kopie.jpg', 
                title: '20180711 IMG 0019 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0033-Kopie.jpg', 
                title: '20180711 IMG 0033 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0038-bewerkt-Kopie.jpg', 
                title: '20180711 IMG 0038 bewerkt Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0078-Kopie.jpg', 
                title: '20180711 IMG 0078 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0085-Kopie.jpg', 
                title: '20180711 IMG 0085 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0096-Kopie.jpg', 
                title: '20180711 IMG 0096 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0121-Kopie.jpg', 
                title: '20180711 IMG 0121 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0122-Kopie.jpg', 
                title: '20180711 IMG 0122 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0149-Kopie.jpg', 
                title: '20180711 IMG 0149 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0164-Kopie.jpg', 
                title: '20180711 IMG 0164 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0192-Kopie.jpg', 
                title: '20180711 IMG 0192 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20180711-IMG_0197-Kopie.jpg', 
                title: '20180711 IMG 0197 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-IMG_0423-Kopie.jpg', 
                title: '20181118 IMG 0423 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-IMG_0449-Kopie.jpg', 
                title: '20181118 IMG 0449 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-IMG_0460-Kopie.jpg', 
                title: '20181118 IMG 0460 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-IMG_0474-Kopie.jpg', 
                title: '20181118 IMG 0474 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-img_0401-kopie.jpg', 
                title: '20181118 img 0401 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-img_0409-kopie.jpg', 
                title: '20181118 img 0409 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-img_0415-kopie.jpg', 
                title: '20181118 img 0415 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-img_0418.jpg', 
                title: '20181118 img 0418', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-img_0430.jpg', 
                title: '20181118 img 0430', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-img_0435-kopie.jpg', 
                title: '20181118 img 0435 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181118-img_0475-kopie.jpg', 
                title: '20181118 img 0475 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0004-Kopie.jpg', 
                title: '20181216 IMG 0004 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0007-Kopie.jpg', 
                title: '20181216 IMG 0007 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0009-Kopie.jpg', 
                title: '20181216 IMG 0009 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0011-Kopie.jpg', 
                title: '20181216 IMG 0011 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0025-Kopie.jpg', 
                title: '20181216 IMG 0025 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0036-Kopie.jpg', 
                title: '20181216 IMG 0036 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0062-Kopie.jpg', 
                title: '20181216 IMG 0062 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0077-Kopie.jpg', 
                title: '20181216 IMG 0077 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0078-Kopie.jpg', 
                title: '20181216 IMG 0078 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0103-Kopie.jpg', 
                title: '20181216 IMG 0103 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0108-Kopie.jpg', 
                title: '20181216 IMG 0108 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0110-Kopie.jpg', 
                title: '20181216 IMG 0110 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0120-Kopie.jpg', 
                title: '20181216 IMG 0120 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0122-Kopie.jpg', 
                title: '20181216 IMG 0122 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0171-Kopie.jpg', 
                title: '20181216 IMG 0171 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0174-Kopie.jpg', 
                title: '20181216 IMG 0174 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0175-Kopie.jpg', 
                title: '20181216 IMG 0175 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0178-Kopie.jpg', 
                title: '20181216 IMG 0178 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0195-Kopie.jpg', 
                title: '20181216 IMG 0195 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20181216-IMG_0244-Kopie.jpg', 
                title: '20181216 IMG 0244 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20210314-IMG_0026-2-scaled.jpg', 
                title: '20210314 IMG 0026 2 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20210314-IMG_0028-2-scaled.jpg', 
                title: '20210314 IMG 0028 2 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/20210314-IMG_0040-2-scaled.jpg', 
                title: '20210314 IMG 0040 2 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/6BDA47F3-D00D-4CB7-A677-E1B4A4B634D5.jpeg', 
                title: '6BDA47F3 D00D 4CB7 A677 E1B4A4B634D5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/7569AC7A-FC3F-4CBF-9049-C12E505164F0.jpeg', 
                title: '7569AC7A FC3F 4CBF 9049 C12E505164F0', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/8B519E05-A1F5-45BD-ADE0-877C5B2D5FE6.jpeg', 
                title: '8B519E05 A1F5 45BD ADE0 877C5B2D5FE6', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/994D9007-A859-42D3-A93F-76ECA78E75F0.jpeg', 
                title: '994D9007 A859 42D3 A93F 76ECA78E75F0', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/9D8F7194-CBB6-4DDF-862E-150513287BC0.jpeg', 
                title: '9D8F7194 CBB6 4DDF 862E 150513287BC0', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/AE7E2E38-A500-4EFE-AB2F-5A65ED5CEE0A.jpeg', 
                title: 'AE7E2E38 A500 4EFE AB2F 5A65ED5CEE0A', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/B7764F4B-F447-4815-8DB4-D5D870287F2B.jpeg', 
                title: 'B7764F4B F447 4815 8DB4 D5D870287F2B', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/E660C55B-6707-48F3-906A-6D69E3299BF5.jpeg', 
                title: 'E660C55B 6707 48F3 906A 6D69E3299BF5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/F00E9C08-97C7-43B0-978A-13C0E325ED59.jpeg', 
                title: 'F00E9C08 97C7 43B0 978A 13C0E325ED59', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0001.jpg', 
                title: 'IMG 0001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0006.jpg', 
                title: 'IMG 0006', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0007-Kopie.jpg', 
                title: 'IMG 0007 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0010-Kopie.jpg', 
                title: 'IMG 0010 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0012-Kopie.jpg', 
                title: 'IMG 0012 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0015.jpg', 
                title: 'IMG 0015', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0017.jpg', 
                title: 'IMG 0017', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0023.jpg', 
                title: 'IMG 0023', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0027.jpg', 
                title: 'IMG 0027', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0031.JPG', 
                title: 'IMG 0031', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0033-Kopie.jpg', 
                title: 'IMG 0033 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0035-Kopie.jpg', 
                title: 'IMG 0035 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0038.jpg', 
                title: 'IMG 0038', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0046.jpg', 
                title: 'IMG 0046', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0049-Kopie.jpg', 
                title: 'IMG 0049 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0062.jpg', 
                title: 'IMG 0062', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0075.jpg', 
                title: 'IMG 0075', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0076.jpg', 
                title: 'IMG 0076', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0078-Kopie.jpg', 
                title: 'IMG 0078 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0082.jpg', 
                title: 'IMG 0082', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0084.jpg', 
                title: 'IMG 0084', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0090.jpg', 
                title: 'IMG 0090', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0109-Kopie.jpg', 
                title: 'IMG 0109 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0134-Kopie.jpg', 
                title: 'IMG 0134 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0150.JPG', 
                title: 'IMG 0150', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0157.JPG', 
                title: 'IMG 0157', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0161.JPG', 
                title: 'IMG 0161', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0167.JPG', 
                title: 'IMG 0167', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0168-Kopie.jpg', 
                title: 'IMG 0168 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0168.JPG', 
                title: 'IMG 0168', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0172.JPG', 
                title: 'IMG 0172', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0175.JPG', 
                title: 'IMG 0175', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0213.JPG', 
                title: 'IMG 0213', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0219.JPG', 
                title: 'IMG 0219', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0370.jpg', 
                title: 'IMG 0370', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0487.JPG', 
                title: 'IMG 0487', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0628.JPG', 
                title: 'IMG 0628', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0733-2.jpg', 
                title: 'IMG 0733 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0733.jpg', 
                title: 'IMG 0733', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0736.jpg', 
                title: 'IMG 0736', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0740-1.jpg', 
                title: 'IMG 0740 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0740-2.jpg', 
                title: 'IMG 0740 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0752-1-1.jpg', 
                title: 'IMG 0752 1 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0752-1.jpg', 
                title: 'IMG 0752 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0767-Kopie.JPG', 
                title: 'IMG 0767 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0769-Kopie.JPG', 
                title: 'IMG 0769 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0770.jpg', 
                title: 'IMG 0770', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0772-Kopie.JPG', 
                title: 'IMG 0772 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0774-Kopie.JPG', 
                title: 'IMG 0774 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0776-Kopie.JPG', 
                title: 'IMG 0776 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0792-Kopie.JPG', 
                title: 'IMG 0792 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0794-Kopie.JPG', 
                title: 'IMG 0794 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0801-Kopie.JPG', 
                title: 'IMG 0801 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0810.JPG', 
                title: 'IMG 0810', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0829-Kopie.JPG', 
                title: 'IMG 0829 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0846.JPG', 
                title: 'IMG 0846', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0865-2.JPG', 
                title: 'IMG 0865 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_0932.JPG', 
                title: 'IMG 0932', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2044.JPG', 
                title: 'IMG 2044', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2045.JPG', 
                title: 'IMG 2045', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2046.JPG', 
                title: 'IMG 2046', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2047.JPG', 
                title: 'IMG 2047', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2048.JPG', 
                title: 'IMG 2048', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2055.JPG', 
                title: 'IMG 2055', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2056.JPG', 
                title: 'IMG 2056', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2057.JPG', 
                title: 'IMG 2057', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2058.JPG', 
                title: 'IMG 2058', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/IMG_2059.JPG', 
                title: 'IMG 2059', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine-2.jpg', 
                title: 'Ine 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine-3.jpg', 
                title: 'Ine 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine-4.jpg', 
                title: 'Ine 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine-5.jpg', 
                title: 'Ine 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2023_10_18naamloos-35-scaled.jpg', 
                title: 'Ine 2023 10 18naamloos 35 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2023_10_18naamloos-39-scaled.jpg', 
                title: 'Ine 2023 10 18naamloos 39 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2023_10_18naamloos-45-kopie-scaled.jpg', 
                title: 'Ine 2023 10 18naamloos 45 kopie scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-108.jpg', 
                title: 'Ine 2024 02 25naamloos 108', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-17.jpg', 
                title: 'Ine 2024 02 25naamloos 17', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-26.jpg', 
                title: 'Ine 2024 02 25naamloos 26', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-44.jpg', 
                title: 'Ine 2024 02 25naamloos 44', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-45.jpg', 
                title: 'Ine 2024 02 25naamloos 45', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-5.jpg', 
                title: 'Ine 2024 02 25naamloos 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-57.jpg', 
                title: 'Ine 2024 02 25naamloos 57', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-64.jpg', 
                title: 'Ine 2024 02 25naamloos 64', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-73.jpg', 
                title: 'Ine 2024 02 25naamloos 73', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-76.jpg', 
                title: 'Ine 2024 02 25naamloos 76', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-77.jpg', 
                title: 'Ine 2024 02 25naamloos 77', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos-8.jpg', 
                title: 'Ine 2024 02 25naamloos 8', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_02_25naamloos.jpg', 
                title: 'Ine 2024 02 25naamloos', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-14.jpg', 
                title: 'Ine 2024 06 23naamloos 14', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-17.jpg', 
                title: 'Ine 2024 06 23naamloos 17', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-3.jpg', 
                title: 'Ine 2024 06 23naamloos 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-33.jpg', 
                title: 'Ine 2024 06 23naamloos 33', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-44.jpg', 
                title: 'Ine 2024 06 23naamloos 44', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-48.jpg', 
                title: 'Ine 2024 06 23naamloos 48', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-49.jpg', 
                title: 'Ine 2024 06 23naamloos 49', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-53.jpg', 
                title: 'Ine 2024 06 23naamloos 53', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-69.jpg', 
                title: 'Ine 2024 06 23naamloos 69', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-77.jpg', 
                title: 'Ine 2024 06 23naamloos 77', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-93.jpg', 
                title: 'Ine 2024 06 23naamloos 93', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_06_23naamloos-95.jpg', 
                title: 'Ine 2024 06 23naamloos 95', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-111.jpg', 
                title: 'Ine 2024 07 21naamloos 111', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-14.jpg', 
                title: 'Ine 2024 07 21naamloos 14', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-2-bewerkt.jpg', 
                title: 'Ine 2024 07 21naamloos 2 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-24-kopie.jpg', 
                title: 'Ine 2024 07 21naamloos 24 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-36-bewerkt.jpg', 
                title: 'Ine 2024 07 21naamloos 36 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-45-bewerkt.jpg', 
                title: 'Ine 2024 07 21naamloos 45 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-46.jpg', 
                title: 'Ine 2024 07 21naamloos 46', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-7-bewerkt.jpg', 
                title: 'Ine 2024 07 21naamloos 7 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-72.jpg', 
                title: 'Ine 2024 07 21naamloos 72', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-74.jpg', 
                title: 'Ine 2024 07 21naamloos 74', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-87.jpg', 
                title: 'Ine 2024 07 21naamloos 87', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_07_21naamloos-99.jpg', 
                title: 'Ine 2024 07 21naamloos 99', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-142.jpg', 
                title: 'Ine 2024 11 17naamloos 142', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-15.jpg', 
                title: 'Ine 2024 11 17naamloos 15', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-153.jpg', 
                title: 'Ine 2024 11 17naamloos 153', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-170.jpg', 
                title: 'Ine 2024 11 17naamloos 170', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-28.jpg', 
                title: 'Ine 2024 11 17naamloos 28', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-4.jpg', 
                title: 'Ine 2024 11 17naamloos 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-53.jpg', 
                title: 'Ine 2024 11 17naamloos 53', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-63.jpg', 
                title: 'Ine 2024 11 17naamloos 63', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-84.jpg', 
                title: 'Ine 2024 11 17naamloos 84', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2024_11_17naamloos-85.jpg', 
                title: 'Ine 2024 11 17naamloos 85', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-17.jpg', 
                title: 'Ine 2025 03 23naamloos 17', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-28.jpg', 
                title: 'Ine 2025 03 23naamloos 28', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-40-kopie-1.jpg', 
                title: 'Ine 2025 03 23naamloos 40 kopie 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-46.jpg', 
                title: 'Ine 2025 03 23naamloos 46', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-47.jpg', 
                title: 'Ine 2025 03 23naamloos 47', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-48.jpg', 
                title: 'Ine 2025 03 23naamloos 48', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-49.jpg', 
                title: 'Ine 2025 03 23naamloos 49', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-5.jpg', 
                title: 'Ine 2025 03 23naamloos 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-51.jpg', 
                title: 'Ine 2025 03 23naamloos 51', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-52.jpg', 
                title: 'Ine 2025 03 23naamloos 52', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-62.jpg', 
                title: 'Ine 2025 03 23naamloos 62', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-63.jpg', 
                title: 'Ine 2025 03 23naamloos 63', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-64.jpg', 
                title: 'Ine 2025 03 23naamloos 64', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos-65.jpg', 
                title: 'Ine 2025 03 23naamloos 65', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_03_23naamloos.jpg', 
                title: 'Ine 2025 03 23naamloos', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-114-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 114 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-12-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 12 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-125-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 125 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-138-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 138 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-14-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 14 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-20-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 20 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-25-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 25 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-45-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 45 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-49-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 49 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-5-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 5 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-55-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 55 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-68-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 68 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-7-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 7 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-79-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 79 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-88-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 88 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-91-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 91 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_09_28naamloos-92-scaled.jpg', 
                title: 'Ine 2025 09 28naamloos 92 scaled', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-102.jpg', 
                title: 'Ine 2025 11 23naamloos 102', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-109.jpg', 
                title: 'Ine 2025 11 23naamloos 109', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-115.jpg', 
                title: 'Ine 2025 11 23naamloos 115', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-117.jpg', 
                title: 'Ine 2025 11 23naamloos 117', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-12.jpg', 
                title: 'Ine 2025 11 23naamloos 12', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-129.jpg', 
                title: 'Ine 2025 11 23naamloos 129', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-133.jpg', 
                title: 'Ine 2025 11 23naamloos 133', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-140.jpg', 
                title: 'Ine 2025 11 23naamloos 140', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-15.jpg', 
                title: 'Ine 2025 11 23naamloos 15', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-18.jpg', 
                title: 'Ine 2025 11 23naamloos 18', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-22.jpg', 
                title: 'Ine 2025 11 23naamloos 22', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-28.jpg', 
                title: 'Ine 2025 11 23naamloos 28', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-34.jpg', 
                title: 'Ine 2025 11 23naamloos 34', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-35.jpg', 
                title: 'Ine 2025 11 23naamloos 35', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-44.jpg', 
                title: 'Ine 2025 11 23naamloos 44', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-62.jpg', 
                title: 'Ine 2025 11 23naamloos 62', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-77.jpg', 
                title: 'Ine 2025 11 23naamloos 77', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-79.jpg', 
                title: 'Ine 2025 11 23naamloos 79', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/Ine_2025_11_23naamloos-86.jpg', 
                title: 'Ine 2025 11 23naamloos 86', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/MG_0039.JPG', 
                title: 'MG 0039', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/MG_0066.JPG', 
                title: 'MG 0066', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/MG_0073.JPG', 
                title: 'MG 0073', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/MG_0075.JPG', 
                title: 'MG 0075', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/honden.jpg', 
                title: 'honden', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0007.jpg', 
                title: 'img 0007', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0020.jpg', 
                title: 'img 0020', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0025.jpg', 
                title: 'img 0025', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0030.jpg', 
                title: 'img 0030', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0035.jpg', 
                title: 'img 0035', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0331.jpg', 
                title: 'img 0331', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0348.jpg', 
                title: 'img 0348', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0372.jpg', 
                title: 'img 0372', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0383.jpg', 
                title: 'img 0383', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_0395.jpg', 
                title: 'img 0395', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/img_7122.jpg', 
                title: 'img 7122', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/paddestoelen-166.jpg', 
                title: 'paddestoelen 166', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ine-janssen/paddestoelen-234.jpg', 
                title: 'paddestoelen 234', 
                category: 'all' 
            }
        ]
    },

    'Henk Regeling': {
        name: 'Henk Regeling',
        photos: [
            { 
                src: 'images/portfolio/henk-regeling/DSCF5213_D.jpg', 
                title: 'DSCF5213 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSCF5216_D.jpg', 
                title: 'DSCF5216 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSCF5221_D.jpg', 
                title: 'DSCF5221 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSCF5228_D.jpg', 
                title: 'DSCF5228 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSCF5238_D.jpg', 
                title: 'DSCF5238 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSCF5246_D.jpg', 
                title: 'DSCF5246 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_0029_D.jpg', 
                title: 'DSC 0029 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_0067_D.jpg', 
                title: 'DSC 0067 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_0092_D.jpg', 
                title: 'DSC 0092 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_0099_D.jpg', 
                title: 'DSC 0099 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_0115_D.jpg', 
                title: 'DSC 0115 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_0118_1_D.jpg', 
                title: 'DSC 0118 1 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_0119_D.jpg', 
                title: 'DSC 0119 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_0145_D.jpg', 
                title: 'DSC 0145 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1184_D.jpg', 
                title: 'DSC 1184 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1187_D.jpg', 
                title: 'DSC 1187 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1202_D.jpg', 
                title: 'DSC 1202 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1212_D.jpg', 
                title: 'DSC 1212 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1787_D.jpg', 
                title: 'DSC 1787 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1803_D.jpg', 
                title: 'DSC 1803 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1811_D.jpg', 
                title: 'DSC 1811 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1814_D.jpg', 
                title: 'DSC 1814 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1818_D.jpg', 
                title: 'DSC 1818 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1820_D.jpg', 
                title: 'DSC 1820 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_1988_D.jpg', 
                title: 'DSC 1988 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2007_D.jpg', 
                title: 'DSC 2007 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2023_D.jpg', 
                title: 'DSC 2023 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2030_D.jpg', 
                title: 'DSC 2030 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2035_D.jpg', 
                title: 'DSC 2035 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2271_D.jpg', 
                title: 'DSC 2271 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2277_D.jpg', 
                title: 'DSC 2277 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2296_D.jpg', 
                title: 'DSC 2296 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2312_D.jpg', 
                title: 'DSC 2312 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2319_D.jpg', 
                title: 'DSC 2319 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_2321_D.jpg', 
                title: 'DSC 2321 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3167_D-1.jpg', 
                title: 'DSC 3167 D 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3170_D-1.jpg', 
                title: 'DSC 3170 D 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3184_D-1.jpg', 
                title: 'DSC 3184 D 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3186_D-1.jpg', 
                title: 'DSC 3186 D 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3189_D-1.jpg', 
                title: 'DSC 3189 D 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3874.jpg', 
                title: 'DSC 3874', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3875.jpg', 
                title: 'DSC 3875', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3882.jpg', 
                title: 'DSC 3882', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3884.jpg', 
                title: 'DSC 3884', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3889_D.jpg', 
                title: 'DSC 3889 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_3906_D.jpg', 
                title: 'DSC 3906 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4001_D2.jpg', 
                title: 'DSC 4001 D2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4006_D2.jpg', 
                title: 'DSC 4006 D2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4014_D2.jpg', 
                title: 'DSC 4014 D2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4021_D2.jpg', 
                title: 'DSC 4021 D2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4022_D2.jpg', 
                title: 'DSC 4022 D2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4052_D2.jpg', 
                title: 'DSC 4052 D2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4583-1.jpg', 
                title: 'DSC 4583 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4586-2.jpg', 
                title: 'DSC 4586 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4590-3.jpg', 
                title: 'DSC 4590 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4596-4.jpg', 
                title: 'DSC 4596 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4612_D-5.jpg', 
                title: 'DSC 4612 D 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4622_D-6.jpg', 
                title: 'DSC 4622 D 6', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4628_D-7.jpg', 
                title: 'DSC 4628 D 7', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4909_D.jpg', 
                title: 'DSC 4909 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4927_D.jpg', 
                title: 'DSC 4927 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4944_D.jpg', 
                title: 'DSC 4944 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4966_D.jpg', 
                title: 'DSC 4966 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4967_D.jpg', 
                title: 'DSC 4967 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_4972_D.jpg', 
                title: 'DSC 4972 D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/henk-regeling/DSC_9621_1_D.jpg', 
                title: 'DSC 9621 1 D', 
                category: 'all' 
            }
        ]
    },

    'Helen Henskens': {
        name: 'Helen Henskens',
        photos: [
            { 
                src: 'images/portfolio/helen-henskens/Gewone_zwavelkop.JPG', 
                title: 'Gewone zwavelkop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/Heideknotszwam.JPG', 
                title: 'Heideknotszwam', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_4784b.jpg', 
                title: 'IMG 4784b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_4786b.jpg', 
                title: 'IMG 4786b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_4794b.jpg', 
                title: 'IMG 4794b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_6154-1K.jpg', 
                title: 'IMG 6154 1K', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_6189-K.jpg', 
                title: 'IMG 6189 K', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_6191-1K.jpg', 
                title: 'IMG 6191 1K', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_6262_02.jpg', 
                title: 'IMG 6262 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_6273-2.jpg', 
                title: 'IMG 6273 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_6282_2.jpg', 
                title: 'IMG 6282 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_6298_2.jpg', 
                title: 'IMG 6298 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_6299_2.jpg', 
                title: 'IMG 6299 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_7033-1.JPG', 
                title: 'IMG 7033 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8193-01.JPG', 
                title: 'IMG 8193 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8259-01.JPG', 
                title: 'IMG 8259 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8327.JPG', 
                title: 'IMG 8327', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8348.JPG', 
                title: 'IMG 8348', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8349.JPG', 
                title: 'IMG 8349', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8350.JPG', 
                title: 'IMG 8350', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8353.JPG', 
                title: 'IMG 8353', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8406-01.JPG', 
                title: 'IMG 8406 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8516.JPG', 
                title: 'IMG 8516', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_8582-01.JPG', 
                title: 'IMG 8582 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_9710.JPG', 
                title: 'IMG 9710', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_9717-01.JPG', 
                title: 'IMG 9717 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_9718.JPG', 
                title: 'IMG 9718', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_9719.JPG', 
                title: 'IMG 9719', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_9730-02.JPG', 
                title: 'IMG 9730 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_9821-k.jpg', 
                title: 'IMG 9821 k', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/IMG_E9814-1.JPG', 
                title: 'IMG E9814 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/Op_Achtergrond_Berkenzwam.JPG', 
                title: 'Op Achtergrond Berkenzwam', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/P1010967b.jpg', 
                title: 'P1010967b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/Parasolzwam.JPG', 
                title: 'Parasolzwam', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/Stippelberg-01.jpg', 
                title: 'Stippelberg 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/Stippelberg-02.jpg', 
                title: 'Stippelberg 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/helen-henskens/Stippelberg-03.jpg', 
                title: 'Stippelberg 03', 
                category: 'all' 
            }
        ]
    },

    'Hans Haarsma': {
        name: 'Hans Haarsma',
        photos: [
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_2171-Middel.jpg', 
                title: '1 IMG 2171 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_2183-Middel.jpg', 
                title: '1 IMG 2183 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_6000-Middel.jpg', 
                title: '1 IMG 6000 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_6712-Middel.jpg', 
                title: '1 IMG 6712 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_6719-Middel.jpg', 
                title: '1 IMG 6719 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_6721-Middel.jpg', 
                title: '1 IMG 6721 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_6946-Middel.jpg', 
                title: '1 IMG 6946 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_6954-Middel.jpg', 
                title: '1 IMG 6954 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/1_IMG_6955-Middel.jpg', 
                title: '1 IMG 6955 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/2_IMG_6719-Middel.jpg', 
                title: '2 IMG 6719 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0497-Middel.jpg', 
                title: 'IMG 0497 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0505-Middel.jpg', 
                title: 'IMG 0505 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0511-Middel.jpg', 
                title: 'IMG 0511 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0521-Middel.jpg', 
                title: 'IMG 0521 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0525-Middel.jpg', 
                title: 'IMG 0525 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0526-Middel.jpg', 
                title: 'IMG 0526 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0528-Middel.jpg', 
                title: 'IMG 0528 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0536-Middel.jpg', 
                title: 'IMG 0536 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0579-Middel.jpg', 
                title: 'IMG 0579 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0582-Middel.jpg', 
                title: 'IMG 0582 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0584-Middel.jpg', 
                title: 'IMG 0584 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0585-Middel.jpg', 
                title: 'IMG 0585 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0638-Middel.jpg', 
                title: 'IMG 0638 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0639-Middel.jpg', 
                title: 'IMG 0639 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0646-Middel.jpg', 
                title: 'IMG 0646 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0650-Middel.jpg', 
                title: 'IMG 0650 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0655-Middel.jpg', 
                title: 'IMG 0655 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0657-Middel.jpg', 
                title: 'IMG 0657 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0662-Middel.jpg', 
                title: 'IMG 0662 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0669-Middel.jpg', 
                title: 'IMG 0669 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0672-Middel.jpg', 
                title: 'IMG 0672 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0678-Middel.jpg', 
                title: 'IMG 0678 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0688-Middel.jpg', 
                title: 'IMG 0688 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0697-Middel.jpg', 
                title: 'IMG 0697 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0858-Groot.jpg', 
                title: 'IMG 0858 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0859-Groot.jpg', 
                title: 'IMG 0859 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0881-Groot.jpg', 
                title: 'IMG 0881 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0890-Groot.jpg', 
                title: 'IMG 0890 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0895-Groot.jpg', 
                title: 'IMG 0895 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0897-Groot.jpg', 
                title: 'IMG 0897 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0898-Groot.jpg', 
                title: 'IMG 0898 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0900-Groot.jpg', 
                title: 'IMG 0900 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0927-Groot.jpg', 
                title: 'IMG 0927 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0928-Groot.jpg', 
                title: 'IMG 0928 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0940-zw-Groot.jpg', 
                title: 'IMG 0940 zw Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0941-Groot.jpg', 
                title: 'IMG 0941 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0943-Groot.jpg', 
                title: 'IMG 0943 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0946-Groot.jpg', 
                title: 'IMG 0946 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0950-zw-Groot.jpg', 
                title: 'IMG 0950 zw Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0950-zw.jpg', 
                title: 'IMG 0950 zw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0951-Groot.jpg', 
                title: 'IMG 0951 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0952-Groot.jpg', 
                title: 'IMG 0952 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0954-Groot.jpg', 
                title: 'IMG 0954 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_0960-Groot.jpg', 
                title: 'IMG 0960 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1032-Groot.jpg', 
                title: 'IMG 1032 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1033-Groot.jpg', 
                title: 'IMG 1033 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1034-Groot.jpg', 
                title: 'IMG 1034 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1037-Groot.jpg', 
                title: 'IMG 1037 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1038-Groot.jpg', 
                title: 'IMG 1038 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1040-Groot.jpg', 
                title: 'IMG 1040 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1046-Groot.jpg', 
                title: 'IMG 1046 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1901-Groot.jpg', 
                title: 'IMG 1901 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1912-ND-Groot.jpg', 
                title: 'IMG 1912 ND Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1915-ND-Groot.jpg', 
                title: 'IMG 1915 ND Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1917-ND-Groot.jpg', 
                title: 'IMG 1917 ND Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1920-ND-Groot.jpg', 
                title: 'IMG 1920 ND Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1923-Groot.jpg', 
                title: 'IMG 1923 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1924-Groot.jpg', 
                title: 'IMG 1924 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1928-Groot.jpg', 
                title: 'IMG 1928 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1929-Groot.jpg', 
                title: 'IMG 1929 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1931-Groot.jpg', 
                title: 'IMG 1931 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1934-Groot.jpg', 
                title: 'IMG 1934 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1937zw-Groot.jpg', 
                title: 'IMG 1937zw Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1938-Groot.jpg', 
                title: 'IMG 1938 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1945-Groot.jpg', 
                title: 'IMG 1945 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1946-Groot.jpg', 
                title: 'IMG 1946 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1947-Groot.jpg', 
                title: 'IMG 1947 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1950-Groot.jpg', 
                title: 'IMG 1950 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1953-Groot.jpg', 
                title: 'IMG 1953 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1957-Groot.jpg', 
                title: 'IMG 1957 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1959-Groot.jpg', 
                title: 'IMG 1959 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1962-Groot.jpg', 
                title: 'IMG 1962 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1966-Groot.jpg', 
                title: 'IMG 1966 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1968-Groot.jpg', 
                title: 'IMG 1968 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1973-Groot.jpg', 
                title: 'IMG 1973 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1976-Groot.jpg', 
                title: 'IMG 1976 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1983-Groot.jpg', 
                title: 'IMG 1983 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1984-Groot.jpg', 
                title: 'IMG 1984 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1986-Groot.jpg', 
                title: 'IMG 1986 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_1987-Groot.jpg', 
                title: 'IMG 1987 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2055-Middel.jpg', 
                title: 'IMG 2055 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2068-Middel.jpg', 
                title: 'IMG 2068 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2069-Middel.jpg', 
                title: 'IMG 2069 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2070-Middel.jpg', 
                title: 'IMG 2070 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2073-Middel.jpg', 
                title: 'IMG 2073 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2081-Middel.jpg', 
                title: 'IMG 2081 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2095-Middel.jpg', 
                title: 'IMG 2095 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2102-Middel.jpg', 
                title: 'IMG 2102 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2107-Middel.jpg', 
                title: 'IMG 2107 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2113-Middel.jpg', 
                title: 'IMG 2113 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2146-Middel.jpg', 
                title: 'IMG 2146 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2175-Middel.jpg', 
                title: 'IMG 2175 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2176-Middel.jpg', 
                title: 'IMG 2176 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2177-Middel.jpg', 
                title: 'IMG 2177 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2178-Middel.jpg', 
                title: 'IMG 2178 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2179-Middel.jpg', 
                title: 'IMG 2179 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2186-Middel.jpg', 
                title: 'IMG 2186 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2194-Groot.jpg', 
                title: 'IMG 2194 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2195-Groot.jpg', 
                title: 'IMG 2195 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2197-Middel.jpg', 
                title: 'IMG 2197 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2199-Groot.jpg', 
                title: 'IMG 2199 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2200-Groot.jpg', 
                title: 'IMG 2200 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2200-Middel.jpg', 
                title: 'IMG 2200 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2207-Groot.jpg', 
                title: 'IMG 2207 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2218-Groot.jpg', 
                title: 'IMG 2218 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2221-Groot.jpg', 
                title: 'IMG 2221 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2222-Groot.jpg', 
                title: 'IMG 2222 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2225-Groot.jpg', 
                title: 'IMG 2225 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2237-Groot.jpg', 
                title: 'IMG 2237 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2301-Groot.jpg', 
                title: 'IMG 2301 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2304-Groot.jpg', 
                title: 'IMG 2304 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2305-Groot.jpg', 
                title: 'IMG 2305 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2310-Groot.jpg', 
                title: 'IMG 2310 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2316-Groot.jpg', 
                title: 'IMG 2316 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2317-Groot.jpg', 
                title: 'IMG 2317 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2320-Groot.jpg', 
                title: 'IMG 2320 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2328-Groot.jpg', 
                title: 'IMG 2328 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2404-Groot.jpg', 
                title: 'IMG 2404 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2406-Groot.jpg', 
                title: 'IMG 2406 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2408-Groot.jpg', 
                title: 'IMG 2408 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2409-Groot.jpg', 
                title: 'IMG 2409 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2417-Groot.jpg', 
                title: 'IMG 2417 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2419-Groot.jpg', 
                title: 'IMG 2419 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2420-Groot.jpg', 
                title: 'IMG 2420 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2425-Groot.jpg', 
                title: 'IMG 2425 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2426-Groot.jpg', 
                title: 'IMG 2426 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2438-Groot.jpg', 
                title: 'IMG 2438 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2444-Groot.jpg', 
                title: 'IMG 2444 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2447-Groot.jpg', 
                title: 'IMG 2447 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2461-Groot.jpg', 
                title: 'IMG 2461 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2779-Groot.jpg', 
                title: 'IMG 2779 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2783-Groot.jpg', 
                title: 'IMG 2783 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2788-Groot.jpg', 
                title: 'IMG 2788 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2797-Groot.jpg', 
                title: 'IMG 2797 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2802-Groot.jpg', 
                title: 'IMG 2802 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_2804-Groot.jpg', 
                title: 'IMG 2804 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3241-Middel.jpg', 
                title: 'IMG 3241 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3246-Middel.jpg', 
                title: 'IMG 3246 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3249-Middel.jpg', 
                title: 'IMG 3249 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3251-Middel.jpg', 
                title: 'IMG 3251 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3252-Middel.jpg', 
                title: 'IMG 3252 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3819-Middel.jpg', 
                title: 'IMG 3819 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3820-Middel.jpg', 
                title: 'IMG 3820 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3841-Middel.jpg', 
                title: 'IMG 3841 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3852-Middel.jpg', 
                title: 'IMG 3852 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3863-Groot.jpg', 
                title: 'IMG 3863 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3864-Groot.jpg', 
                title: 'IMG 3864 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3864-Middel.jpg', 
                title: 'IMG 3864 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3866-Groot.jpg', 
                title: 'IMG 3866 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3867-Groot.jpg', 
                title: 'IMG 3867 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3868-Groot.jpg', 
                title: 'IMG 3868 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3868-Middel.jpg', 
                title: 'IMG 3868 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3870-Groot.jpg', 
                title: 'IMG 3870 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3873-Groot.jpg', 
                title: 'IMG 3873 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3874-Groot.jpg', 
                title: 'IMG 3874 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3874-Middel.jpg', 
                title: 'IMG 3874 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3875-Groot.jpg', 
                title: 'IMG 3875 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3877-Groot.jpg', 
                title: 'IMG 3877 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3887-Middel.jpg', 
                title: 'IMG 3887 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3888-Groot.jpg', 
                title: 'IMG 3888 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3889-Groot.jpg', 
                title: 'IMG 3889 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3897-Groot.jpg', 
                title: 'IMG 3897 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3905-Groot.jpg', 
                title: 'IMG 3905 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3950-Middel.jpg', 
                title: 'IMG 3950 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3954-Middel.jpg', 
                title: 'IMG 3954 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3958-Middel.jpg', 
                title: 'IMG 3958 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3966-Middel.jpg', 
                title: 'IMG 3966 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3973-Middel.jpg', 
                title: 'IMG 3973 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3974-Middel.jpg', 
                title: 'IMG 3974 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3976-Middel.jpg', 
                title: 'IMG 3976 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3979-Middel.jpg', 
                title: 'IMG 3979 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3984-Middel.jpg', 
                title: 'IMG 3984 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3988-Middel.jpg', 
                title: 'IMG 3988 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_3991-Middel.jpg', 
                title: 'IMG 3991 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4038-Middel.jpg', 
                title: 'IMG 4038 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4048-Middel.jpg', 
                title: 'IMG 4048 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4056-Middel.jpg', 
                title: 'IMG 4056 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4058-Middel.jpg', 
                title: 'IMG 4058 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4060-Middel.jpg', 
                title: 'IMG 4060 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4062-Middel.jpg', 
                title: 'IMG 4062 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4216-zw-Groot.jpg', 
                title: 'IMG 4216 zw Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4217-Groot.jpg', 
                title: 'IMG 4217 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4276-Middel.jpg', 
                title: 'IMG 4276 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4281-Middel.jpg', 
                title: 'IMG 4281 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4318-Middel.jpg', 
                title: 'IMG 4318 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4320-Middel.jpg', 
                title: 'IMG 4320 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4428-Middel.jpg', 
                title: 'IMG 4428 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4430-Middel.jpg', 
                title: 'IMG 4430 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4433-Middel.jpg', 
                title: 'IMG 4433 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4434-Middel.jpg', 
                title: 'IMG 4434 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4435-Middel.jpg', 
                title: 'IMG 4435 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4438-Middel.jpg', 
                title: 'IMG 4438 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4440-Middel.jpg', 
                title: 'IMG 4440 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4441-Middel.jpg', 
                title: 'IMG 4441 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4445-Middel.jpg', 
                title: 'IMG 4445 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4450-Middel.jpg', 
                title: 'IMG 4450 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4457-Middel.jpg', 
                title: 'IMG 4457 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4460-Middel.jpg', 
                title: 'IMG 4460 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4462-Middel.jpg', 
                title: 'IMG 4462 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4466-Middel.jpg', 
                title: 'IMG 4466 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4471-Middel.jpg', 
                title: 'IMG 4471 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4473-Middel.jpg', 
                title: 'IMG 4473 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4475-Groot.jpg', 
                title: 'IMG 4475 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4476-Middel.jpg', 
                title: 'IMG 4476 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4477-Groot.jpg', 
                title: 'IMG 4477 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4478-Groot.jpg', 
                title: 'IMG 4478 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4479-Groot.jpg', 
                title: 'IMG 4479 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4489-Groot.jpg', 
                title: 'IMG 4489 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4506-Middel.jpg', 
                title: 'IMG 4506 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4513-Middel.jpg', 
                title: 'IMG 4513 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4517-Middel.jpg', 
                title: 'IMG 4517 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4666-Middel.jpg', 
                title: 'IMG 4666 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4666.jpg', 
                title: 'IMG 4666', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4670-Middel.jpg', 
                title: 'IMG 4670 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4670.jpg', 
                title: 'IMG 4670', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4690-Middel.jpg', 
                title: 'IMG 4690 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4690.jpg', 
                title: 'IMG 4690', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4791-Middel.jpg', 
                title: 'IMG 4791 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4805-Middel.jpg', 
                title: 'IMG 4805 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4811-Middel.jpg', 
                title: 'IMG 4811 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4812-Middel.jpg', 
                title: 'IMG 4812 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4815-Middel.jpg', 
                title: 'IMG 4815 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4819-Middel.jpg', 
                title: 'IMG 4819 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_4821-Middel.jpg', 
                title: 'IMG 4821 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5077-Groot.jpg', 
                title: 'IMG 5077 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5081-Groot.jpg', 
                title: 'IMG 5081 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5082-Groot.jpg', 
                title: 'IMG 5082 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5083-Groot.jpg', 
                title: 'IMG 5083 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5085-Groot.jpg', 
                title: 'IMG 5085 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5088-Groot.jpg', 
                title: 'IMG 5088 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5090-Groot.jpg', 
                title: 'IMG 5090 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5975-Middel.jpg', 
                title: 'IMG 5975 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5979-Middel.jpg', 
                title: 'IMG 5979 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5983-Middel.jpg', 
                title: 'IMG 5983 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5987-Middel.jpg', 
                title: 'IMG 5987 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5991-Middel.jpg', 
                title: 'IMG 5991 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5991.jpg', 
                title: 'IMG 5991', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5992.jpg', 
                title: 'IMG 5992', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5993.jpg', 
                title: 'IMG 5993', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5995-Middel.jpg', 
                title: 'IMG 5995 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5995.jpg', 
                title: 'IMG 5995', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_5999-Middel.jpg', 
                title: 'IMG 5999 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6000-Middel.jpg', 
                title: 'IMG 6000 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6001-Middel.jpg', 
                title: 'IMG 6001 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6004-Middel.jpg', 
                title: 'IMG 6004 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6005-Middel.jpg', 
                title: 'IMG 6005 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6006-Middel.jpg', 
                title: 'IMG 6006 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6010-Middel.jpg', 
                title: 'IMG 6010 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6012-Middel.jpg', 
                title: 'IMG 6012 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6020-Middel.jpg', 
                title: 'IMG 6020 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6021-Middel.jpg', 
                title: 'IMG 6021 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6022-Middel.jpg', 
                title: 'IMG 6022 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6193-Middel.jpg', 
                title: 'IMG 6193 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6195-Middel.jpg', 
                title: 'IMG 6195 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6197-Middel.jpg', 
                title: 'IMG 6197 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6200-Middel.jpg', 
                title: 'IMG 6200 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6206-Middel.jpg', 
                title: 'IMG 6206 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6210-Middel.jpg', 
                title: 'IMG 6210 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6211-Middel.jpg', 
                title: 'IMG 6211 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6215-Middel.jpg', 
                title: 'IMG 6215 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6217-Middel.jpg', 
                title: 'IMG 6217 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6218-Middel.jpg', 
                title: 'IMG 6218 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6219-Middel.jpg', 
                title: 'IMG 6219 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6220-Middel.jpg', 
                title: 'IMG 6220 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6260.jpg', 
                title: 'IMG 6260', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6262-Middel.jpg', 
                title: 'IMG 6262 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6262.jpg', 
                title: 'IMG 6262', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6264-Middel.jpg', 
                title: 'IMG 6264 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6264.jpg', 
                title: 'IMG 6264', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6266-Middel.jpg', 
                title: 'IMG 6266 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6266.jpg', 
                title: 'IMG 6266', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6268-Middel.jpg', 
                title: 'IMG 6268 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6268.jpg', 
                title: 'IMG 6268', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6269-Middel.jpg', 
                title: 'IMG 6269 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6269.jpg', 
                title: 'IMG 6269', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6270-Middel.jpg', 
                title: 'IMG 6270 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6270.jpg', 
                title: 'IMG 6270', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6273-Middel.jpg', 
                title: 'IMG 6273 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6275-Middel.jpg', 
                title: 'IMG 6275 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6275.jpg', 
                title: 'IMG 6275', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6277-Middel.jpg', 
                title: 'IMG 6277 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6280-Middel.jpg', 
                title: 'IMG 6280 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6280.jpg', 
                title: 'IMG 6280', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6281-Middel.jpg', 
                title: 'IMG 6281 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6286-Middel.jpg', 
                title: 'IMG 6286 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6289-Middel.jpg', 
                title: 'IMG 6289 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6293-Middel.jpg', 
                title: 'IMG 6293 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6299-Middel.jpg', 
                title: 'IMG 6299 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6446-Middel.jpg', 
                title: 'IMG 6446 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6447-Middel.jpg', 
                title: 'IMG 6447 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6450-Middel.jpg', 
                title: 'IMG 6450 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6456-Middel.jpg', 
                title: 'IMG 6456 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6459-Middel.jpg', 
                title: 'IMG 6459 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6464-Middel.jpg', 
                title: 'IMG 6464 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6466-Middel.jpg', 
                title: 'IMG 6466 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6467-Middel.jpg', 
                title: 'IMG 6467 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6472-Middel.jpg', 
                title: 'IMG 6472 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6672-Middel.jpg', 
                title: 'IMG 6672 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6673-zw-Middel.jpg', 
                title: 'IMG 6673 zw Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6676-zw-Middel.jpg', 
                title: 'IMG 6676 zw Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6678-zw-Middel.jpg', 
                title: 'IMG 6678 zw Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6686-Middel.jpg', 
                title: 'IMG 6686 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6692-Middel.jpg', 
                title: 'IMG 6692 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6693-Middel.jpg', 
                title: 'IMG 6693 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6696-Middel.jpg', 
                title: 'IMG 6696 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6698-Middel.jpg', 
                title: 'IMG 6698 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6708-Middel.jpg', 
                title: 'IMG 6708 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6716-Middel.jpg', 
                title: 'IMG 6716 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6717-Middel.jpg', 
                title: 'IMG 6717 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6718-Middel.jpg', 
                title: 'IMG 6718 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6720-Middel.jpg', 
                title: 'IMG 6720 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6877-Middel.jpg', 
                title: 'IMG 6877 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6880-Middel.jpg', 
                title: 'IMG 6880 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6895-Middel.jpg', 
                title: 'IMG 6895 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6897-Middel.jpg', 
                title: 'IMG 6897 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6913-Middel.jpg', 
                title: 'IMG 6913 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6915-Middel.jpg', 
                title: 'IMG 6915 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6918-Middel.jpg', 
                title: 'IMG 6918 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6931-Middel.jpg', 
                title: 'IMG 6931 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6932-Middel.jpg', 
                title: 'IMG 6932 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6935-Middel.jpg', 
                title: 'IMG 6935 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6936-Middel.jpg', 
                title: 'IMG 6936 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6941-Middel.jpg', 
                title: 'IMG 6941 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6945-Middel.jpg', 
                title: 'IMG 6945 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6946-Middel.jpg', 
                title: 'IMG 6946 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6947-Middel.jpg', 
                title: 'IMG 6947 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6949-Middel.jpg', 
                title: 'IMG 6949 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6952-Middel.jpg', 
                title: 'IMG 6952 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6954-Middel.jpg', 
                title: 'IMG 6954 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6955-Middel.jpg', 
                title: 'IMG 6955 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6958-Middel.jpg', 
                title: 'IMG 6958 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6959-Middel.jpg', 
                title: 'IMG 6959 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6964-Middel.jpg', 
                title: 'IMG 6964 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6965-Middel.jpg', 
                title: 'IMG 6965 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6969-Middel.jpg', 
                title: 'IMG 6969 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6973-Middel.jpg', 
                title: 'IMG 6973 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_6980-Middel.jpg', 
                title: 'IMG 6980 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7003-Middel.jpg', 
                title: 'IMG 7003 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7008-Middel.jpg', 
                title: 'IMG 7008 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7013-Middel.jpg', 
                title: 'IMG 7013 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7017-Middel.jpg', 
                title: 'IMG 7017 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7019-Middel.jpg', 
                title: 'IMG 7019 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7059-Middel.jpg', 
                title: 'IMG 7059 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7060-Middel.jpg', 
                title: 'IMG 7060 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7061-Middel.jpg', 
                title: 'IMG 7061 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7065-Middel.jpg', 
                title: 'IMG 7065 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7066-Middel.jpg', 
                title: 'IMG 7066 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7068-Middel.jpg', 
                title: 'IMG 7068 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7069-Middel.jpg', 
                title: 'IMG 7069 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7070-Middel.jpg', 
                title: 'IMG 7070 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7075-Middel.jpg', 
                title: 'IMG 7075 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7169-Middel.jpg', 
                title: 'IMG 7169 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7171-Middel.jpg', 
                title: 'IMG 7171 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7175-Middel.jpg', 
                title: 'IMG 7175 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7181-Middel.jpg', 
                title: 'IMG 7181 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7192-Middel.jpg', 
                title: 'IMG 7192 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7211-Middel.jpg', 
                title: 'IMG 7211 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7225-Middel.jpg', 
                title: 'IMG 7225 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7231-Middel.jpg', 
                title: 'IMG 7231 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7363-Middel.jpg', 
                title: 'IMG 7363 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7366-Middel.jpg', 
                title: 'IMG 7366 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7369-Middel.jpg', 
                title: 'IMG 7369 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7371-Middel.jpg', 
                title: 'IMG 7371 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7373-Middel.jpg', 
                title: 'IMG 7373 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7375-Middel.jpg', 
                title: 'IMG 7375 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7396-Middel.jpg', 
                title: 'IMG 7396 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7397-Middel.jpg', 
                title: 'IMG 7397 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7399-Middel.jpg', 
                title: 'IMG 7399 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7593-Middel.jpg', 
                title: 'IMG 7593 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7594-Middel.jpg', 
                title: 'IMG 7594 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7597-Middel.jpg', 
                title: 'IMG 7597 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7601-Middel.jpg', 
                title: 'IMG 7601 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7603-Middel.jpg', 
                title: 'IMG 7603 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7605-Middel.jpg', 
                title: 'IMG 7605 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7611-Middel.jpg', 
                title: 'IMG 7611 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7612-Middel.jpg', 
                title: 'IMG 7612 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7616-Middel.jpg', 
                title: 'IMG 7616 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7622-Middel.jpg', 
                title: 'IMG 7622 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7776-Middel.jpg', 
                title: 'IMG 7776 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7779-Middel.jpg', 
                title: 'IMG 7779 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7787-Middel.jpg', 
                title: 'IMG 7787 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7793-Middel.jpg', 
                title: 'IMG 7793 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7796-Klein.jpg', 
                title: 'IMG 7796 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7796-Middel.jpg', 
                title: 'IMG 7796 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7798-Klein.jpg', 
                title: 'IMG 7798 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7799-Klein.jpg', 
                title: 'IMG 7799 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7801-Klein.jpg', 
                title: 'IMG 7801 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7802-Klein.jpg', 
                title: 'IMG 7802 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7802-Middel.jpg', 
                title: 'IMG 7802 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7803-Klein.jpg', 
                title: 'IMG 7803 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7805-Middel.jpg', 
                title: 'IMG 7805 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7808-Klein.jpg', 
                title: 'IMG 7808 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7809-Middel.jpg', 
                title: 'IMG 7809 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7810-Klein.jpg', 
                title: 'IMG 7810 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7811-Middel.jpg', 
                title: 'IMG 7811 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7812-Klein.jpg', 
                title: 'IMG 7812 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7818-Klein.jpg', 
                title: 'IMG 7818 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7820-Klein.jpg', 
                title: 'IMG 7820 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7826-Klein.jpg', 
                title: 'IMG 7826 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7828-Middel.jpg', 
                title: 'IMG 7828 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7833-Middel.jpg', 
                title: 'IMG 7833 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7837-Middel.jpg', 
                title: 'IMG 7837 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7838-Middel.jpg', 
                title: 'IMG 7838 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7839-Middel.jpg', 
                title: 'IMG 7839 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7841-Middel.jpg', 
                title: 'IMG 7841 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7843-Middel.jpg', 
                title: 'IMG 7843 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7853-Middel.jpg', 
                title: 'IMG 7853 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_7854-Middel.jpg', 
                title: 'IMG 7854 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8037-Klein.jpg', 
                title: 'IMG 8037 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8040-Klein.jpg', 
                title: 'IMG 8040 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8048-Klein.jpg', 
                title: 'IMG 8048 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8052-Klein.jpg', 
                title: 'IMG 8052 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8060-Klein.jpg', 
                title: 'IMG 8060 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8064-Klein.jpg', 
                title: 'IMG 8064 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8068-Klein.jpg', 
                title: 'IMG 8068 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8073-Klein.jpg', 
                title: 'IMG 8073 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8073-Middel.jpg', 
                title: 'IMG 8073 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8074-Middel.jpg', 
                title: 'IMG 8074 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8077-Klein.jpg', 
                title: 'IMG 8077 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8077-Middel.jpg', 
                title: 'IMG 8077 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8079-Klein.jpg', 
                title: 'IMG 8079 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8083-Middel.jpg', 
                title: 'IMG 8083 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8087-Middel.jpg', 
                title: 'IMG 8087 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8092-Middel.jpg', 
                title: 'IMG 8092 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8096-Middel.jpg', 
                title: 'IMG 8096 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8102-Middel.jpg', 
                title: 'IMG 8102 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8105-Middel.jpg', 
                title: 'IMG 8105 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8108-Middel.jpg', 
                title: 'IMG 8108 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8117-Middel.jpg', 
                title: 'IMG 8117 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8123-Middel.jpg', 
                title: 'IMG 8123 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8131-Middel.jpg', 
                title: 'IMG 8131 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8134-Middel.jpg', 
                title: 'IMG 8134 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8137-Middel.jpg', 
                title: 'IMG 8137 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8139-Middel.jpg', 
                title: 'IMG 8139 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8146-Middel.jpg', 
                title: 'IMG 8146 Middel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8284-Klein.jpg', 
                title: 'IMG 8284 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8287-Klein.jpg', 
                title: 'IMG 8287 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8299-Klein.jpg', 
                title: 'IMG 8299 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8306-Klein.jpg', 
                title: 'IMG 8306 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8310-Klein.jpg', 
                title: 'IMG 8310 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8325-Klein.jpg', 
                title: 'IMG 8325 Klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8478-Groot.jpg', 
                title: 'IMG 8478 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8497-Groot.jpg', 
                title: 'IMG 8497 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8529-Groot.jpg', 
                title: 'IMG 8529 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8537-Groot.jpg', 
                title: 'IMG 8537 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8542-Groot.jpg', 
                title: 'IMG 8542 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8629-Groot.jpg', 
                title: 'IMG 8629 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8631-Groot.jpg', 
                title: 'IMG 8631 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8633-Groot.jpg', 
                title: 'IMG 8633 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8634-Groot.jpg', 
                title: 'IMG 8634 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8636-Groot.jpg', 
                title: 'IMG 8636 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8638-Groot.jpg', 
                title: 'IMG 8638 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8664-Groot.jpg', 
                title: 'IMG 8664 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8679-Groot.jpg', 
                title: 'IMG 8679 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8703-Groot.jpg', 
                title: 'IMG 8703 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8717-Groot.jpg', 
                title: 'IMG 8717 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8718-Groot.jpg', 
                title: 'IMG 8718 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8754-Groot.jpg', 
                title: 'IMG 8754 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8760-Groot.jpg', 
                title: 'IMG 8760 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_8762-Groot.jpg', 
                title: 'IMG 8762 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9097-Groot.jpg', 
                title: 'IMG 9097 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9098-Groot.jpg', 
                title: 'IMG 9098 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9099-Groot.jpg', 
                title: 'IMG 9099 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9101-Groot.jpg', 
                title: 'IMG 9101 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9104-Groot.jpg', 
                title: 'IMG 9104 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9107-Groot.jpg', 
                title: 'IMG 9107 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9109-Groot.jpg', 
                title: 'IMG 9109 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9111-Groot.jpg', 
                title: 'IMG 9111 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9115-Groot.jpg', 
                title: 'IMG 9115 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9118-Groot.jpg', 
                title: 'IMG 9118 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9122-Groot.jpg', 
                title: 'IMG 9122 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9133-Groot.jpg', 
                title: 'IMG 9133 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9134-Groot.jpg', 
                title: 'IMG 9134 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9137-Groot.jpg', 
                title: 'IMG 9137 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9564-Groot.jpg', 
                title: 'IMG 9564 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9572-Groot.jpg', 
                title: 'IMG 9572 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9583-Groot.jpg', 
                title: 'IMG 9583 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9585-Groot.jpg', 
                title: 'IMG 9585 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9590-Groot.jpg', 
                title: 'IMG 9590 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9602-Groot.jpg', 
                title: 'IMG 9602 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9666-Groot.jpg', 
                title: 'IMG 9666 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9669-Groot.jpg', 
                title: 'IMG 9669 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9674-Groot.jpg', 
                title: 'IMG 9674 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9675-Groot.jpg', 
                title: 'IMG 9675 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9681-Groot.jpg', 
                title: 'IMG 9681 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9686-Groot.jpg', 
                title: 'IMG 9686 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9690-Groot.jpg', 
                title: 'IMG 9690 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9694-Groot.jpg', 
                title: 'IMG 9694 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9696-Groot.jpg', 
                title: 'IMG 9696 Groot', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/hans-haarsma/IMG_9742-Groot.jpg', 
                title: 'IMG 9742 Groot', 
                category: 'all' 
            }
        ]
    },

    'Gerhard Bod': {
        name: 'Gerhard Bod',
        photos: [
            { 
                src: 'images/portfolio/gerhard-bod/DSC00505.jpg', 
                title: 'DSC00505', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC00532.jpg', 
                title: 'DSC00532', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC00592.jpg', 
                title: 'DSC00592', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC00907.jpg', 
                title: 'DSC00907', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC00950.jpg', 
                title: 'DSC00950', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC01246.jpg', 
                title: 'DSC01246', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC01516-Verbeterd-NR.jpg', 
                title: 'DSC01516 Verbeterd NR', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC03641-Verbeterd-NR.jpg', 
                title: 'DSC03641 Verbeterd NR', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC03661.jpg', 
                title: 'DSC03661', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC03675.jpg', 
                title: 'DSC03675', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC03689.jpg', 
                title: 'DSC03689', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC04300-Pano.jpg', 
                title: 'DSC04300 Pano', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC04365.jpg', 
                title: 'DSC04365', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC04463-HDR.jpg', 
                title: 'DSC04463 HDR', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC04756.jpg', 
                title: 'DSC04756', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC04834.jpg', 
                title: 'DSC04834', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC05288.jpg', 
                title: 'DSC05288', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC05336-HDR.jpg', 
                title: 'DSC05336 HDR', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC06208.jpg', 
                title: 'DSC06208', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC06215.jpg', 
                title: 'DSC06215', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC06413-Verbeterd-NR.jpg', 
                title: 'DSC06413 Verbeterd NR', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC06456.jpg', 
                title: 'DSC06456', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC06489.jpg', 
                title: 'DSC06489', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/gerhard-bod/DSC07848.jpg', 
                title: 'DSC07848', 
                category: 'all' 
            }
        ]
    },

    'Frank van den Broek': {
        name: 'Frank van den Broek',
        photos: [
            { 
                src: 'images/portfolio/frank-van-den-broek/DSC_3260.JPG', 
                title: 'DSC 3260', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/frank-van-den-broek/DSC_3262.JPG', 
                title: 'DSC 3262', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/frank-van-den-broek/DSC_3263.JPG', 
                title: 'DSC 3263', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/frank-van-den-broek/DSC_3268.JPG', 
                title: 'DSC 3268', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/frank-van-den-broek/DSC_3269.JPG', 
                title: 'DSC 3269', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/frank-van-den-broek/DSC_9069a.jpg', 
                title: 'DSC 9069a', 
                category: 'all' 
            }
        ]
    },

    'Corrie Cobussen': {
        name: 'Corrie Cobussen',
        photos: [
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0073.jpg', 
                title: 'dscn0073', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0121.jpg', 
                title: 'dscn0121', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0122.jpg', 
                title: 'dscn0122', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0137.jpg', 
                title: 'dscn0137', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0189.jpg', 
                title: 'dscn0189', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0191.jpg', 
                title: 'dscn0191', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0437.jpg', 
                title: 'dscn0437', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0444.jpg', 
                title: 'dscn0444', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0444_0.jpg', 
                title: 'dscn0444 0', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0463.jpg', 
                title: 'dscn0463', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn0471.jpg', 
                title: 'dscn0471', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/corrie-cobussen/dscn9910.jpg', 
                title: 'dscn9910', 
                category: 'all' 
            }
        ]
    },

    'Cocky Anderson': {
        name: 'Cocky Anderson',
        photos: [
            { 
                src: 'images/portfolio/cocky-anderson/Belmonte-Arboretum-2025.1.jpg', 
                title: 'Belmonte Arboretum 2025.1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/cocky-anderson/Belmonte-Arboretum-2025.2.jpg', 
                title: 'Belmonte Arboretum 2025.2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/cocky-anderson/Belmonte-Arboretum-2025.3.jpg', 
                title: 'Belmonte Arboretum 2025.3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/cocky-anderson/Jachthut_Cocky01.jpg', 
                title: 'Jachthut Cocky01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/cocky-anderson/Jachthut_Cocky02.jpg', 
                title: 'Jachthut Cocky02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/cocky-anderson/Wolfsberg_CA1.jpg', 
                title: 'Wolfsberg CA1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/cocky-anderson/Wollfsberg_CA2.jpg', 
                title: 'Wollfsberg CA2', 
                category: 'all' 
            }
        ]
    },

    'Bianca Dekkers - van Uden': {
        name: 'Bianca Dekkers - van Uden',
        photos: [
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1610030013.jpg', 
                title: '1610030013', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1610030018-a.jpg', 
                title: '1610030018 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1610190183182.jpg', 
                title: '1610190183182', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1610230236250.jpg', 
                title: '1610230236250', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1610250451-a.jpg', 
                title: '1610250451 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1612030049.jpg', 
                title: '1612030049', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1612110030.jpg', 
                title: '1612110030', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1612220278.jpg', 
                title: '1612220278', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1612290321.jpg', 
                title: '1612290321', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1702180453.jpg', 
                title: '1702180453', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1703120295-303.jpg', 
                title: '1703120295 303', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1703150604-zw-b.jpg', 
                title: '1703150604 zw b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1703310120klein.jpg', 
                title: '1703310120klein', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1704200478.jpg', 
                title: '1704200478', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1704200536a.jpg', 
                title: '1704200536a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/1704200562.jpg', 
                title: '1704200562', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/17050700176zw.jpg', 
                title: '17050700176zw', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/170510002140219b.jpg', 
                title: '170510002140219b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0002-01.jpeg', 
                title: 'DSC 0002 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0023-01.jpeg', 
                title: 'DSC 0023 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0032-02.jpeg', 
                title: 'DSC 0032 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0048-02.jpeg', 
                title: 'DSC 0048 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0065-03.jpeg', 
                title: 'DSC 0065 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0105-03.jpeg', 
                title: 'DSC 0105 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0285_1-01.jpeg', 
                title: 'DSC 0285 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0313_3-01.jpeg', 
                title: 'DSC 0313 3 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0328-01.jpeg', 
                title: 'DSC 0328 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0358-04.jpeg', 
                title: 'DSC 0358 04', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0392_1-01.jpeg', 
                title: 'DSC 0392 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0408_1-01.jpeg', 
                title: 'DSC 0408 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0476-01.jpeg', 
                title: 'DSC 0476 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0507-01.jpeg', 
                title: 'DSC 0507 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0509_1-01.jpeg', 
                title: 'DSC 0509 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0522-02.jpeg', 
                title: 'DSC 0522 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0566-01.jpeg', 
                title: 'DSC 0566 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0572_2-01.jpeg', 
                title: 'DSC 0572 2 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0576_1-01.jpeg', 
                title: 'DSC 0576 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0577-03.jpeg', 
                title: 'DSC 0577 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0589-02.jpeg', 
                title: 'DSC 0589 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0592-02.jpeg', 
                title: 'DSC 0592 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0609-01.jpeg', 
                title: 'DSC 0609 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0613-02.jpeg', 
                title: 'DSC 0613 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0614_1-01.jpeg', 
                title: 'DSC 0614 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0623_1-02.jpeg', 
                title: 'DSC 0623 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0628_1-01.jpeg', 
                title: 'DSC 0628 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0629_1-01.jpeg', 
                title: 'DSC 0629 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0635_1-01.jpeg', 
                title: 'DSC 0635 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0637_3-01.jpeg', 
                title: 'DSC 0637 3 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0647_2-01.jpeg', 
                title: 'DSC 0647 2 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0649-01.jpeg', 
                title: 'DSC 0649 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0651_1-01.jpeg', 
                title: 'DSC 0651 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0657_2-01.jpeg', 
                title: 'DSC 0657 2 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0670-01.jpeg', 
                title: 'DSC 0670 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0677_3-01.jpeg', 
                title: 'DSC 0677 3 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0715_1-01.jpeg', 
                title: 'DSC 0715 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0716-01.jpeg', 
                title: 'DSC 0716 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0723-01.jpeg', 
                title: 'DSC 0723 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0889_1-01.jpeg', 
                title: 'DSC 0889 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0890-02.jpeg', 
                title: 'DSC 0890 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0914-01-01.jpeg', 
                title: 'DSC 0914 01 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0914-01.jpeg', 
                title: 'DSC 0914 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0922_1-02.jpeg', 
                title: 'DSC 0922 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0942_1-01.jpeg', 
                title: 'DSC 0942 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_0945_1-01-01.jpeg', 
                title: 'DSC 0945 1 01 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1021_1-01.jpeg', 
                title: 'DSC 1021 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1022-01.jpeg', 
                title: 'DSC 1022 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1023-01.jpeg', 
                title: 'DSC 1023 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1045-02.jpeg', 
                title: 'DSC 1045 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1062-02.jpeg', 
                title: 'DSC 1062 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1064-02.jpeg', 
                title: 'DSC 1064 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1075-02.jpeg', 
                title: 'DSC 1075 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1162_1-01.jpeg', 
                title: 'DSC 1162 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1166_1-01.jpeg', 
                title: 'DSC 1166 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1185_2-01.jpeg', 
                title: 'DSC 1185 2 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1285_3-03.jpeg', 
                title: 'DSC 1285 3 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1290_1-03.jpeg', 
                title: 'DSC 1290 1 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1317_1-01.jpeg', 
                title: 'DSC 1317 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1346_2-02.jpeg', 
                title: 'DSC 1346 2 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1354_1-01.jpeg', 
                title: 'DSC 1354 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1372-03.jpeg', 
                title: 'DSC 1372 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1409_1-01.jpeg', 
                title: 'DSC 1409 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1557-02.jpeg', 
                title: 'DSC 1557 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1565-05.jpeg', 
                title: 'DSC 1565 05', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1581-02.jpeg', 
                title: 'DSC 1581 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1583-01.jpeg', 
                title: 'DSC 1583 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1591-01.jpeg', 
                title: 'DSC 1591 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1612-01.jpeg', 
                title: 'DSC 1612 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1620-01.jpeg', 
                title: 'DSC 1620 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1681_1-02.jpeg', 
                title: 'DSC 1681 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1696-03.jpeg', 
                title: 'DSC 1696 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1703-01.jpeg', 
                title: 'DSC 1703 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1716-01.jpeg', 
                title: 'DSC 1716 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1731-01.jpeg', 
                title: 'DSC 1731 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1734_1-01.jpeg', 
                title: 'DSC 1734 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1744-01.jpeg', 
                title: 'DSC 1744 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1751-01.jpeg', 
                title: 'DSC 1751 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_1771-01.jpeg', 
                title: 'DSC 1771 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2507-01.jpeg', 
                title: 'DSC 2507 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2528-01.jpeg', 
                title: 'DSC 2528 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2535-01.jpeg', 
                title: 'DSC 2535 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2541_1-01.jpeg', 
                title: 'DSC 2541 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2570_1-01.jpeg', 
                title: 'DSC 2570 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2585-01.jpeg', 
                title: 'DSC 2585 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2592-01.jpeg', 
                title: 'DSC 2592 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2593_1-02.jpeg', 
                title: 'DSC 2593 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_2595_1-03.jpeg', 
                title: 'DSC 2595 1 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8080_1-02.jpeg', 
                title: 'DSC 8080 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8090_3-01.jpeg', 
                title: 'DSC 8090 3 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8092-01.jpeg', 
                title: 'DSC 8092 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8093-02.jpeg', 
                title: 'DSC 8093 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8114_2-01.jpeg', 
                title: 'DSC 8114 2 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8117_1-01.jpeg', 
                title: 'DSC 8117 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8139-03.jpeg', 
                title: 'DSC 8139 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8142_1-01.jpeg', 
                title: 'DSC 8142 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8773_1-01.jpeg', 
                title: 'DSC 8773 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8774_1-02.jpeg', 
                title: 'DSC 8774 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8835-01.jpeg', 
                title: 'DSC 8835 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8844-02.jpeg', 
                title: 'DSC 8844 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_8877-02.jpeg', 
                title: 'DSC 8877 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9058_1-02.jpeg', 
                title: 'DSC 9058 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9128-02.jpeg', 
                title: 'DSC 9128 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9136-01.jpeg', 
                title: 'DSC 9136 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9144-02.jpeg', 
                title: 'DSC 9144 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9167-01.jpeg', 
                title: 'DSC 9167 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9195-02.jpeg', 
                title: 'DSC 9195 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9409_1-01.jpeg', 
                title: 'DSC 9409 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9418_1-01.jpeg', 
                title: 'DSC 9418 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9424_1-01.jpeg', 
                title: 'DSC 9424 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9427_1-01.jpeg', 
                title: 'DSC 9427 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9432_2-02.jpeg', 
                title: 'DSC 9432 2 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9441_1-01.jpeg', 
                title: 'DSC 9441 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9528-01.jpeg', 
                title: 'DSC 9528 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9534_1-01.jpeg', 
                title: 'DSC 9534 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9538_1-02.jpeg', 
                title: 'DSC 9538 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9558_1-01.jpeg', 
                title: 'DSC 9558 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9578_1-02.jpeg', 
                title: 'DSC 9578 1 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9592-02.jpeg', 
                title: 'DSC 9592 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9597_1-01.jpeg', 
                title: 'DSC 9597 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9612_1-01.jpeg', 
                title: 'DSC 9612 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9617-01.jpeg', 
                title: 'DSC 9617 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9634-01.jpeg', 
                title: 'DSC 9634 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9658_2-03.jpeg', 
                title: 'DSC 9658 2 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9664_1-01.jpeg', 
                title: 'DSC 9664 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9847-03.jpeg', 
                title: 'DSC 9847 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9906-01.jpeg', 
                title: 'DSC 9906 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9923_1-01.jpeg', 
                title: 'DSC 9923 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9934_1-01.jpeg', 
                title: 'DSC 9934 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9939_1-01.jpeg', 
                title: 'DSC 9939 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9947_1-01.jpeg', 
                title: 'DSC 9947 1 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9956-02.jpeg', 
                title: 'DSC 9956 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9958_2-01.jpeg', 
                title: 'DSC 9958 2 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9959-01.jpeg', 
                title: 'DSC 9959 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9978_1-03.jpeg', 
                title: 'DSC 9978 1 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9987-02-01.jpeg', 
                title: 'DSC 9987 02 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/DSC_9991_3-01.jpeg', 
                title: 'DSC 9991 3 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bianca-dekkers---van-uden/Foto-afdrukken-Bianca-Dekkers-Custom.jpg', 
                title: 'Foto afdrukken Bianca Dekkers Custom', 
                category: 'all' 
            }
        ]
    },

    'Bert van Zijderveld': {
        name: 'Bert van Zijderveld',
        photos: [
            { 
                src: 'images/portfolio/bert-van-zijderveld/05192104-8FA8-4B51-8635-CE1D2FA65207.jpeg', 
                title: '05192104 8FA8 4B51 8635 CE1D2FA65207', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/0B53B5FD-C6C7-47B8-AE83-CC539D57A0DE.jpeg', 
                title: '0B53B5FD C6C7 47B8 AE83 CC539D57A0DE', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/1150340.jpeg', 
                title: '1150340', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/1260163.jpeg', 
                title: '1260163', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/17F7BCDB-D1F3-4967-8F76-B27607B68B58.jpeg', 
                title: '17F7BCDB D1F3 4967 8F76 B27607B68B58', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/198B007A-6575-431D-9BB9-9E6A14DD1066.jpeg', 
                title: '198B007A 6575 431D 9BB9 9E6A14DD1066', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/19E49AB9-470C-45F6-A080-E0C1622E3793.jpeg', 
                title: '19E49AB9 470C 45F6 A080 E0C1622E3793', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/1_8240646.jpeg', 
                title: '1 8240646', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/1_9290103.jpeg', 
                title: '1 9290103', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/1_9AD1827C-99BC-4711-B11D-C37121B89028.jpeg', 
                title: '1 9AD1827C 99BC 4711 B11D C37121B89028', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/1_AE521966-7461-4A39-AD99-D860B8810B64.jpeg', 
                title: '1 AE521966 7461 4A39 AD99 D860B8810B64', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/1_C040124.jpeg', 
                title: '1 C040124', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/1_FDD59B58-8605-4630-91B1-5F06109EA4BD_1_201_a.jpeg', 
                title: '1 FDD59B58 8605 4630 91B1 5F06109EA4BD 1 201 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2010058.jpeg', 
                title: '2010058', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180607-P6070162.jpg', 
                title: '20180607 P6070162', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180608-P6080178.jpg', 
                title: '20180608 P6080178', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180608-P6080198.jpg', 
                title: '20180608 P6080198', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180608-P6080260.jpg', 
                title: '20180608 P6080260', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180608-P6080311.jpg', 
                title: '20180608 P6080311', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180719-P7190072.jpg', 
                title: '20180719 P7190072', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180719-P7190092.jpg', 
                title: '20180719 P7190092', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180719-P7190158.jpg', 
                title: '20180719 P7190158', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180730-P7300215.jpg', 
                title: '20180730 P7300215', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180909-P9090055.jpg', 
                title: '20180909 P9090055', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180909-P9090150.jpg', 
                title: '20180909 P9090150', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20180909-P9090212.jpg', 
                title: '20180909 P9090212', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/20190110_vogels_1100051.jpg', 
                title: '20190110 vogels 1100051', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2160035.jpg', 
                title: '2160035', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2160065.jpg', 
                title: '2160065', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2160076.jpg', 
                title: '2160076', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2190039.jpg', 
                title: '2190039', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2190119-bewerkt.jpg', 
                title: '2190119 bewerkt', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2250048.jpeg', 
                title: '2250048', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2250194.jpeg', 
                title: '2250194', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2A308A9B-45B3-463C-9721-559FB1778920.jpeg', 
                title: '2A308A9B 45B3 463C 9721 559FB1778920', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2AD05D43-7BB5-47DE-9DB6-0B3E734BD11F.jpeg', 
                title: '2AD05D43 7BB5 47DE 9DB6 0B3E734BD11F', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2D46B454-EFB4-44F9-9110-EA27CC972C58.jpeg', 
                title: '2D46B454 EFB4 44F9 9110 EA27CC972C58', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/2_C040124.jpeg', 
                title: '2 C040124', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/30179D2A-1615-4C3D-836E-0BDB1D2468EE.jpeg', 
                title: '30179D2A 1615 4C3D 836E 0BDB1D2468EE', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/3040217.jpg', 
                title: '3040217', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/36D648FE-62B9-4F7E-AC1C-A29354C4175C.jpeg', 
                title: '36D648FE 62B9 4F7E AC1C A29354C4175C', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/383FCF3F-E02D-46EF-B7DF-8F99FAF45261.jpeg', 
                title: '383FCF3F E02D 46EF B7DF 8F99FAF45261', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/3AE445C1-44C6-4507-BEF0-88D49A6944BE.jpeg', 
                title: '3AE445C1 44C6 4507 BEF0 88D49A6944BE', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/3BF44862-D280-408C-92EB-69288F43DDD8.jpeg', 
                title: '3BF44862 D280 408C 92EB 69288F43DDD8', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/3C586CC7-DC06-4C9F-A245-CC7CFCA8341B.jpeg', 
                title: '3C586CC7 DC06 4C9F A245 CC7CFCA8341B', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/3D7B1B70-A7FE-4A1E-A273-41C697A5BEF6.jpeg', 
                title: '3D7B1B70 A7FE 4A1E A273 41C697A5BEF6', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/3_C040124.jpeg', 
                title: '3 C040124', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/4130170.jpeg', 
                title: '4130170', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/4130810.jpeg', 
                title: '4130810', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/4131543.jpeg', 
                title: '4131543', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/41DE10A2-0CD6-4104-94D9-D727C05D8817.jpeg', 
                title: '41DE10A2 0CD6 4104 94D9 D727C05D8817', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/4210046.jpeg', 
                title: '4210046', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/4260086.jpg', 
                title: '4260086', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/497600C3-D2DD-4E34-913C-65E3F30F987E.jpeg', 
                title: '497600C3 D2DD 4E34 913C 65E3F30F987E', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/4A95D01E-7B4A-4CD6-B7B3-39729928F901.jpeg', 
                title: '4A95D01E 7B4A 4CD6 B7B3 39729928F901', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/4C3708B6-772C-4C42-8AD7-50C16AD4EA53.jpeg', 
                title: '4C3708B6 772C 4C42 8AD7 50C16AD4EA53', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/4FACF370-5C0C-463B-AFB7-ED8936C2AD94.jpeg', 
                title: '4FACF370 5C0C 463B AFB7 ED8936C2AD94', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5020016.jpg', 
                title: '5020016', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5020139.jpg', 
                title: '5020139', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/50962D90-ED25-412D-ABE1-D863330A7C37.jpeg', 
                title: '50962D90 ED25 412D ABE1 D863330A7C37', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5120053.jpeg', 
                title: '5120053', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5210125.jpg', 
                title: '5210125', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5210276.jpeg', 
                title: '5210276', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5210337.jpg', 
                title: '5210337', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5240023.jpeg', 
                title: '5240023', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5240107.jpeg', 
                title: '5240107', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5250005.jpeg', 
                title: '5250005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5250092.jpeg', 
                title: '5250092', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5250182.jpeg', 
                title: '5250182', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5250185.jpeg', 
                title: '5250185', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5250204.jpeg', 
                title: '5250204', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5250230-Verbeterd-NR.jpeg', 
                title: '5250230 Verbeterd NR', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5250251.jpeg', 
                title: '5250251', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/5AD4F462-CCB3-4A78-AF6A-A8E8871B81A2.jpeg', 
                title: '5AD4F462 CCB3 4A78 AF6A A8E8871B81A2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6090046.jpg', 
                title: '6090046', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6090081.jpeg', 
                title: '6090081', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6110074.jpg', 
                title: '6110074', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6110237.jpg', 
                title: '6110237', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6110273.jpg', 
                title: '6110273', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6220054.jpeg', 
                title: '6220054', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6220059.jpeg', 
                title: '6220059', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6220080.jpeg', 
                title: '6220080', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/6220095.jpeg', 
                title: '6220095', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/636D40DF-8D06-43EF-95D6-853FAF60A559.jpeg', 
                title: '636D40DF 8D06 43EF 95D6 853FAF60A559', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7140064.jpeg', 
                title: '7140064', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7140067.jpeg', 
                title: '7140067', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7140089.jpeg', 
                title: '7140089', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7140109.jpeg', 
                title: '7140109', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7140137.jpeg', 
                title: '7140137', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7140155.jpeg', 
                title: '7140155', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7150030.jpeg', 
                title: '7150030', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7150049.jpeg', 
                title: '7150049', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7150087.jpeg', 
                title: '7150087', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7150399.jpeg', 
                title: '7150399', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7160335.jpg', 
                title: '7160335', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7210059.jpeg', 
                title: '7210059', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7210094.jpeg', 
                title: '7210094', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7270021.jpeg', 
                title: '7270021', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7270074.jpeg', 
                title: '7270074', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7270083.jpeg', 
                title: '7270083', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7270104.jpeg', 
                title: '7270104', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7270109.jpeg', 
                title: '7270109', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7D27B83C-10FA-4045-BDFD-F699A32FDFF1.jpeg', 
                title: '7D27B83C 10FA 4045 BDFD F699A32FDFF1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/7EBDCC91-3CFA-4BFF-9195-28FAA3D70CF4.jpeg', 
                title: '7EBDCC91 3CFA 4BFF 9195 28FAA3D70CF4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/8030098.jpeg', 
                title: '8030098', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/8110037.jpeg', 
                title: '8110037', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/8110097.jpeg', 
                title: '8110097', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/8240609.jpeg', 
                title: '8240609', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/8240653.jpeg', 
                title: '8240653', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/8240671.jpeg', 
                title: '8240671', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/8240734.jpeg', 
                title: '8240734', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/85D958C5-E259-4D1C-9BF1-B48F50415F4A.jpeg', 
                title: '85D958C5 E259 4D1C 9BF1 B48F50415F4A', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/87189253-F29B-4B87-8F87-58ECAD76A5CA.jpeg', 
                title: '87189253 F29B 4B87 8F87 58ECAD76A5CA', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/87EEBAEB-7DAC-49D6-90BD-40CA452B18E3.jpeg', 
                title: '87EEBAEB 7DAC 49D6 90BD 40CA452B18E3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/8A473320-24AA-45C8-BBB2-6F616666A30F.jpeg', 
                title: '8A473320 24AA 45C8 BBB2 6F616666A30F', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/90CC5E12-B546-45BA-A04E-9321E81CC721.jpeg', 
                title: '90CC5E12 B546 45BA A04E 9321E81CC721', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9170027-Pano.jpg', 
                title: '9170027 Pano', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9290004.jpeg', 
                title: '9290004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9290007.jpeg', 
                title: '9290007', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9290103.jpeg', 
                title: '9290103', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9290138.jpeg', 
                title: '9290138', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9290154.jpeg', 
                title: '9290154', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9290172.jpeg', 
                title: '9290172', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9290184.jpeg', 
                title: '9290184', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9290220.jpeg', 
                title: '9290220', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/96347D4D-99BB-43A1-A867-67AA9D7A6BFD.jpeg', 
                title: '96347D4D 99BB 43A1 A867 67AA9D7A6BFD', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/97265856-7D65-42D6-94C3-F36FD6E7EA81.jpeg', 
                title: '97265856 7D65 42D6 94C3 F36FD6E7EA81', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/982432DC-E8B7-4575-B6AE-E32E165EFC3A.jpeg', 
                title: '982432DC E8B7 4575 B6AE E32E165EFC3A', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/990BA255-7365-43C7-B35C-7F844A0B5EDF.jpeg', 
                title: '990BA255 7365 43C7 B35C 7F844A0B5EDF', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9A4A0259-5BFD-4E50-BF8F-B6B63872DEE7.jpeg', 
                title: '9A4A0259 5BFD 4E50 BF8F B6B63872DEE7', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9C1FF1C1-EAF3-47AA-AE1E-A30C176FC4B3.jpeg', 
                title: '9C1FF1C1 EAF3 47AA AE1E A30C176FC4B3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/9E9EF4DB-E8F2-42AC-9698-1F689DB0B83B.jpeg', 
                title: '9E9EF4DB E8F2 42AC 9698 1F689DB0B83B', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A16F3177-0DBC-4D1F-B815-79648CFE949A.jpeg', 
                title: 'A16F3177 0DBC 4D1F B815 79648CFE949A', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A1AD81A5-601D-4AC1-A70F-B02419A1147A.jpeg', 
                title: 'A1AD81A5 601D 4AC1 A70F B02419A1147A', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A200487.jpg', 
                title: 'A200487', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A200508.jpg', 
                title: 'A200508', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A200526.jpg', 
                title: 'A200526', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A200544.jpg', 
                title: 'A200544', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A200584.jpg', 
                title: 'A200584', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A200610.jpg', 
                title: 'A200610', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A200632.jpg', 
                title: 'A200632', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260732.jpeg', 
                title: 'A260732', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260746.jpeg', 
                title: 'A260746', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260751.jpeg', 
                title: 'A260751', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260763.jpeg', 
                title: 'A260763', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260783.jpeg', 
                title: 'A260783', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260786.jpeg', 
                title: 'A260786', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260789.jpeg', 
                title: 'A260789', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260793.jpeg', 
                title: 'A260793', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260796.jpeg', 
                title: 'A260796', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260811.jpeg', 
                title: 'A260811', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260818.jpeg', 
                title: 'A260818', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A260820.jpeg', 
                title: 'A260820', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A68A02E6-DA1D-4C7D-9514-396A0F027425.jpeg', 
                title: 'A68A02E6 DA1D 4C7D 9514 396A0F027425', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/A7AC79B1-9932-47B1-BA04-6E7A3AA69B97.jpeg', 
                title: 'A7AC79B1 9932 47B1 BA04 6E7A3AA69B97', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/AA06CFA2-9D76-406F-AF9A-A720F3494EC2_1_201_a.jpeg', 
                title: 'AA06CFA2 9D76 406F AF9A A720F3494EC2 1 201 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/AA4DA507-1F06-4467-B6CE-112CF79C7348.jpeg', 
                title: 'AA4DA507 1F06 4467 B6CE 112CF79C7348', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/AB57B48D-46B1-4D58-93F9-802074F00DF0.jpeg', 
                title: 'AB57B48D 46B1 4D58 93F9 802074F00DF0', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B170023.jpeg', 
                title: 'B170023', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B230070.jpeg', 
                title: 'B230070', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B230081.jpeg', 
                title: 'B230081', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B230146.jpeg', 
                title: 'B230146', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B230189.jpeg', 
                title: 'B230189', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B230244.jpeg', 
                title: 'B230244', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B230281.jpeg', 
                title: 'B230281', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B230304.jpeg', 
                title: 'B230304', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B230324.jpeg', 
                title: 'B230324', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/B7D03FFE-CD6D-477D-801C-72887812C13E.jpeg', 
                title: 'B7D03FFE CD6D 477D 801C 72887812C13E', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/BF85C135-B8DE-401B-BAC1-139B672EDE63.jpeg', 
                title: 'BF85C135 B8DE 401B BAC1 139B672EDE63', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C020055.jpeg', 
                title: 'C020055', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C040047.jpeg', 
                title: 'C040047', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C040124.jpeg', 
                title: 'C040124', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C150013.jpeg', 
                title: 'C150013', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C150064.jpeg', 
                title: 'C150064', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C150079.jpeg', 
                title: 'C150079', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C150118.jpeg', 
                title: 'C150118', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C280064.jpeg', 
                title: 'C280064', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C3812FAE-1681-4397-9C2E-EC269717D8CD.jpeg', 
                title: 'C3812FAE 1681 4397 9C2E EC269717D8CD', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C5A10B96-0D11-4A46-8FD2-136F8219AE52.jpeg', 
                title: 'C5A10B96 0D11 4A46 8FD2 136F8219AE52', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C60C38EE-10D8-442E-A7F2-8C4200436A15_1_201_a.jpeg', 
                title: 'C60C38EE 10D8 442E A7F2 8C4200436A15 1 201 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/C9BCA8C3-F3A9-451F-AF3D-07DE523867B4.jpeg', 
                title: 'C9BCA8C3 F3A9 451F AF3D 07DE523867B4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/D5844BCC-18AA-4E32-AF46-B2769BBEADEF.jpeg', 
                title: 'D5844BCC 18AA 4E32 AF46 B2769BBEADEF', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/DB1CB112-367E-4C91-AC33-3ACDBB65A7F5.jpeg', 
                title: 'DB1CB112 367E 4C91 AC33 3ACDBB65A7F5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/DB9293EA-BFC0-4309-89B0-43A030D1646B.jpeg', 
                title: 'DB9293EA BFC0 4309 89B0 43A030D1646B', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/DE67C7A8-7F93-47D6-8065-5E05E119F327.jpeg', 
                title: 'DE67C7A8 7F93 47D6 8065 5E05E119F327', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/E0AE1F2D-1946-4253-98FD-A39C6566D666.jpeg', 
                title: 'E0AE1F2D 1946 4253 98FD A39C6566D666', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/E69D831F-2BFB-4229-97AA-F2FE72AC2D9A.jpeg', 
                title: 'E69D831F 2BFB 4229 97AA F2FE72AC2D9A', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/E9555018-620D-40DF-83A9-94E2DF9F20A8.jpeg', 
                title: 'E9555018 620D 40DF 83A9 94E2DF9F20A8', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/E990F783-6B0C-48B5-BF6E-5C7C7C5FCD6B.jpeg', 
                title: 'E990F783 6B0C 48B5 BF6E 5C7C7C5FCD6B', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/EA230187-768E-4057-A864-8DBF806FD38A.jpeg', 
                title: 'EA230187 768E 4057 A864 8DBF806FD38A', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/EC696A42-580D-40CC-8830-70164DF63687.jpeg', 
                title: 'EC696A42 580D 40CC 8830 70164DF63687', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/F156C76D-D0DB-4B6A-B7D4-C3B8D6591051.jpeg', 
                title: 'F156C76D D0DB 4B6A B7D4 C3B8D6591051', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/F628F0C7-9116-4E72-AADC-28039292E6E7.jpeg', 
                title: 'F628F0C7 9116 4E72 AADC 28039292E6E7', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/F90C7365-2EBD-4831-A570-A4B7CEB3217D.jpeg', 
                title: 'F90C7365 2EBD 4831 A570 A4B7CEB3217D', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/F92AECC2-1B3F-4BF8-B1D8-58F85FCB6BCF.jpeg', 
                title: 'F92AECC2 1B3F 4BF8 B1D8 58F85FCB6BCF', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1020669.jpg', 
                title: 'L1020669', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1021602.jpg', 
                title: 'L1021602', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1021610.jpg', 
                title: 'L1021610', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1021664.jpg', 
                title: 'L1021664', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1021672.jpg', 
                title: 'L1021672', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1022518.jpg', 
                title: 'L1022518', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1023453.jpg', 
                title: 'L1023453', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1024324.jpg', 
                title: 'L1024324', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1024399.jpg', 
                title: 'L1024399', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1028144.jpg', 
                title: 'L1028144', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1028361.jpg', 
                title: 'L1028361', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1028422.jpg', 
                title: 'L1028422', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1028670.jpeg', 
                title: 'L1028670', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1028675.jpeg', 
                title: 'L1028675', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1028685.jpeg', 
                title: 'L1028685', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1028695.jpeg', 
                title: 'L1028695', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1028702.jpeg', 
                title: 'L1028702', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1029583.jpeg', 
                title: 'L1029583', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1029593.jpeg', 
                title: 'L1029593', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1029623.jpeg', 
                title: 'L1029623', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1029633.jpeg', 
                title: 'L1029633', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1029640.jpeg', 
                title: 'L1029640', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1029646.jpeg', 
                title: 'L1029646', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1029674.jpeg', 
                title: 'L1029674', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1032183.jpg', 
                title: 'L1032183', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1032205.jpg', 
                title: 'L1032205', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1033355.jpeg', 
                title: 'L1033355', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1033395.jpeg', 
                title: 'L1033395', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1033461.jpeg', 
                title: 'L1033461', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/L1033611.jpeg', 
                title: 'L1033611', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/P4130215.jpeg', 
                title: 'P4130215', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/P4130549.jpeg', 
                title: 'P4130549', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/P4130747.jpeg', 
                title: 'P4130747', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/P4130781.jpeg', 
                title: 'P4130781', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/P4130992.jpeg', 
                title: 'P4130992', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/P4131350.jpeg', 
                title: 'P4131350', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/P5150058.jpg', 
                title: 'P5150058', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/PC080005.jpg', 
                title: 'PC080005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/PC080045.jpg', 
                title: 'PC080045', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/bert-van-zijderveld/PC280119-Verbeterd-NR.jpeg', 
                title: 'PC280119 Verbeterd NR', 
                category: 'all' 
            }
        ]
    },

    'Ans Heisen': {
        name: 'Ans Heisen',
        photos: [
            { 
                src: 'images/portfolio/ans-heisen/DSC_0197-kopie-3.jpg', 
                title: 'DSC 0197 kopie 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0204-kopie.jpg', 
                title: 'DSC 0204 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0206-kopie-10.jpg', 
                title: 'DSC 0206 kopie 10', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0219-kopie-5.jpg', 
                title: 'DSC 0219 kopie 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0222-kopie-2.jpg', 
                title: 'DSC 0222 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0233-kopie-4.jpg', 
                title: 'DSC 0233 kopie 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0243-kopie-4.jpg', 
                title: 'DSC 0243 kopie 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0252-kopie-6.jpg', 
                title: 'DSC 0252 kopie 6', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0280-kopie.jpg', 
                title: 'DSC 0280 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0308-kopie-4.jpg', 
                title: 'DSC 0308 kopie 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0569-kopie-.jpg', 
                title: 'DSC 0569 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0574-kopie-.jpg', 
                title: 'DSC 0574 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0577-kopie-.jpg', 
                title: 'DSC 0577 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0591-kopie-.jpg', 
                title: 'DSC 0591 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0599-kopie-.jpg', 
                title: 'DSC 0599 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0606-kopie.jpg', 
                title: 'DSC 0606 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0611-kopie-.jpg', 
                title: 'DSC 0611 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0619-kopie-.jpg', 
                title: 'DSC 0619 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0635-kopie-.jpg', 
                title: 'DSC 0635 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0690-kopie-.jpg', 
                title: 'DSC 0690 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0890-kopieren.jpg', 
                title: 'DSC 0890 kopieren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0894-kopieren.jpg', 
                title: 'DSC 0894 kopieren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0920-kopieren.jpg', 
                title: 'DSC 0920 kopieren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_0972-kopieren.jpg', 
                title: 'DSC 0972 kopieren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_1017-kopieren.jpg', 
                title: 'DSC 1017 kopieren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_1185-kopi_C3_ABren.jpg', 
                title: 'DSC 1185 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_1287-kopi_C3_ABren.jpg', 
                title: 'DSC 1287 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2228-kopie.jpg', 
                title: 'DSC 2228 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2235-kopie-5.jpg', 
                title: 'DSC 2235 kopie 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2254-kopie-14-a.jpg', 
                title: 'DSC 2254 kopie 14 a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2272-kopie-5.jpg', 
                title: 'DSC 2272 kopie 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2275-kopie.jpg', 
                title: 'DSC 2275 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2276-kopie-a.jpg', 
                title: 'DSC 2276 kopie a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2285-kopie.jpg', 
                title: 'DSC 2285 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2313-kopie.jpg', 
                title: 'DSC 2313 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2317-kopie-2.jpg', 
                title: 'DSC 2317 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2522-kopieren-2.jpg', 
                title: 'DSC 2522 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2522-kopieren-8.jpg', 
                title: 'DSC 2522 kopieren 8', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2522-kopieren-9.jpg', 
                title: 'DSC 2522 kopieren 9', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2541-kopieren-5.jpg', 
                title: 'DSC 2541 kopieren 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_26177kopieren-2.jpg', 
                title: 'DSC 26177kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2634-kopieren-3.jpg', 
                title: 'DSC 2634 kopieren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2665-kopieren-2.jpg', 
                title: 'DSC 2665 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2666-kopieren-2.jpg', 
                title: 'DSC 2666 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_2688kopieren-2.jpg', 
                title: 'DSC 2688kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_3558-ans.jpg', 
                title: 'DSC 3558 ans', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_3559-ans.jpg', 
                title: 'DSC 3559 ans', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_3598-ans.jpg', 
                title: 'DSC 3598 ans', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_3603-ans.jpg', 
                title: 'DSC 3603 ans', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_3778-ans.jpg', 
                title: 'DSC 3778 ans', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5094-kopie.jpg', 
                title: 'DSC 5094 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5142-kopie.jpg', 
                title: 'DSC 5142 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5172-kopie-4.jpg', 
                title: 'DSC 5172 kopie 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5187-kopie-3.jpg', 
                title: 'DSC 5187 kopie 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5210-kopie-3.jpg', 
                title: 'DSC 5210 kopie 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5264-kopie-4.jpg', 
                title: 'DSC 5264 kopie 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5282-kopie-2.jpg', 
                title: 'DSC 5282 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5287-kopie-3.jpg', 
                title: 'DSC 5287 kopie 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5344-kopie-11.jpg', 
                title: 'DSC 5344 kopie 11', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5364-kopi_C3_ABren-2.jpg', 
                title: 'DSC 5364 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5393-kopi_C3_ABren-2.jpg', 
                title: 'DSC 5393 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5441-kopi_C3_ABren.jpg', 
                title: 'DSC 5441 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5457-kopi_C3_ABren.jpg', 
                title: 'DSC 5457 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5475-kopi_C3_ABren.jpg', 
                title: 'DSC 5475 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5549-kopi_C3_ABren-3.jpg', 
                title: 'DSC 5549 kopi C3 ABren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5578-kopi_C3_ABren.jpg', 
                title: 'DSC 5578 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5592-kopi_C3_ABren.jpg', 
                title: 'DSC 5592 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5600-kopi_C3_ABren.jpg', 
                title: 'DSC 5600 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5604-kopi_C3_ABren.jpg', 
                title: 'DSC 5604 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5606-kopi_C3_ABren-2.jpg', 
                title: 'DSC 5606 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5617-kopi_C3_ABren.jpg', 
                title: 'DSC 5617 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5625-kopi_C3_ABren.jpg', 
                title: 'DSC 5625 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5635-kopi_C3_ABren-2.jpg', 
                title: 'DSC 5635 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5641.JPG', 
                title: 'DSC 5641', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5658-kopi_C3_ABren.jpg', 
                title: 'DSC 5658 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5669-kopi_C3_ABren.jpg', 
                title: 'DSC 5669 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5672-kopi_C3_ABren.jpg', 
                title: 'DSC 5672 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_5861-kopie-4.jpg', 
                title: 'DSC 5861 kopie 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6001-kopi_C3_ABren.jpg', 
                title: 'DSC 6001 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6020-kopi_C3_ABren-3.jpg', 
                title: 'DSC 6020 kopi C3 ABren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6021-kopi_C3_ABren.jpg', 
                title: 'DSC 6021 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6023-kopi_C3_ABren-2.jpg', 
                title: 'DSC 6023 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6027-kopi_C3_ABren-2.jpg', 
                title: 'DSC 6027 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6040-kopi_C3_ABren.jpg', 
                title: 'DSC 6040 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6074-kopi_C3_ABren-7.jpg', 
                title: 'DSC 6074 kopi C3 ABren 7', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6091-kopi_C3_ABren-3.jpg', 
                title: 'DSC 6091 kopi C3 ABren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6097-kopi_C3_ABren.jpg', 
                title: 'DSC 6097 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6179-kopi_C3_ABren.jpg', 
                title: 'DSC 6179 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6186-kopi_C3_ABren.jpg', 
                title: 'DSC 6186 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6209-kopi_C3_ABren-3.jpg', 
                title: 'DSC 6209 kopi C3 ABren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6212-kopi_C3_ABren-3.jpg', 
                title: 'DSC 6212 kopi C3 ABren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6215-kopi_C3_ABren.jpg', 
                title: 'DSC 6215 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6300-kopi_C3_ABren-4_4003x.jpg', 
                title: 'DSC 6300 kopi C3 ABren 4 4003x', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6869-kopieren-2.jpg', 
                title: 'DSC 6869 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6955-kopieren.jpg', 
                title: 'DSC 6955 kopieren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_6962-kopieren-2.jpg', 
                title: 'DSC 6962 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_7034-kopieren.jpg', 
                title: 'DSC 7034 kopieren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_7040-kopieren-2.jpg', 
                title: 'DSC 7040 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_7069-kopieren-3.jpg', 
                title: 'DSC 7069 kopieren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_7076-kopieren-3.jpg', 
                title: 'DSC 7076 kopieren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_7083-kopieren-3.jpg', 
                title: 'DSC 7083 kopieren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_7981-kopi_C3_ABren.jpg', 
                title: 'DSC 7981 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_7992-kopi_C3_ABren-r.jpg', 
                title: 'DSC 7992 kopi C3 ABren r', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_7999-kopi_C3_ABren-2.jpg', 
                title: 'DSC 7999 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8001-kopi_C3_ABren-2.jpg', 
                title: 'DSC 8001 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8003-kopi_C3_ABren.jpg', 
                title: 'DSC 8003 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8005-kopi_C3_ABren.jpg', 
                title: 'DSC 8005 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8006-kopi_C3_ABren.jpg', 
                title: 'DSC 8006 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8009-kopi_C3_ABren.jpg', 
                title: 'DSC 8009 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8025-kopi_C3_ABren.jpg', 
                title: 'DSC 8025 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8029-kopi_C3_ABren.jpg', 
                title: 'DSC 8029 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8036-kopi_C3_ABren.jpg', 
                title: 'DSC 8036 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8049-kopi_C3_ABren.jpg', 
                title: 'DSC 8049 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8063-kopi_C3_ABren.jpg', 
                title: 'DSC 8063 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8066-kopi_C3_ABren.jpg', 
                title: 'DSC 8066 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8075-kopi_C3_ABren.jpg', 
                title: 'DSC 8075 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8077-kopi_C3_ABren.jpg', 
                title: 'DSC 8077 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8079-kopi_C3_ABren.jpg', 
                title: 'DSC 8079 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8084_1.JPG', 
                title: 'DSC 8084 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8089-kopi_C3_ABren.jpg', 
                title: 'DSC 8089 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8090.JPG', 
                title: 'DSC 8090', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8092-kopi_C3_ABren.jpg', 
                title: 'DSC 8092 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8096-kopi_C3_ABren.jpg', 
                title: 'DSC 8096 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8098-kopi_C3_ABren.jpg', 
                title: 'DSC 8098 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8105-kopi_C3_ABren.jpg', 
                title: 'DSC 8105 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8107.JPG', 
                title: 'DSC 8107', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8110-kopi_C3_ABren.jpg', 
                title: 'DSC 8110 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8112-kopi_C3_ABren.jpg', 
                title: 'DSC 8112 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8113-kopi_C3_ABren.jpg', 
                title: 'DSC 8113 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8143-kopi_C3_ABren.jpg', 
                title: 'DSC 8143 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8153-kopi_C3_ABren-2.jpg', 
                title: 'DSC 8153 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8153-kopi_C3_ABren.jpg', 
                title: 'DSC 8153 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8156-kopi_C3_ABren.jpg', 
                title: 'DSC 8156 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8184_1.JPG', 
                title: 'DSC 8184 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8467-kopi_C3_ABren-2.jpg', 
                title: 'DSC 8467 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8469-kopi_C3_ABren.jpg', 
                title: 'DSC 8469 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8477-kopi_C3_ABren.jpg', 
                title: 'DSC 8477 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8539-kopi_C3_ABren-2.jpg', 
                title: 'DSC 8539 kopi C3 ABren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8542-kopi_C3_ABren.jpg', 
                title: 'DSC 8542 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8566-kopi_C3_ABren.jpg', 
                title: 'DSC 8566 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8570-kopi_C3_ABren.jpg', 
                title: 'DSC 8570 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8572-kopi_C3_ABren-4.jpg', 
                title: 'DSC 8572 kopi C3 ABren 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8616-kopi_C3_ABren.jpg', 
                title: 'DSC 8616 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8716-kopi_C3_ABren.jpg', 
                title: 'DSC 8716 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8745-kopi_C3_ABren.jpg', 
                title: 'DSC 8745 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8746-kopi_C3_ABren.jpg', 
                title: 'DSC 8746 kopi C3 ABren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8849-kopie-3.jpg', 
                title: 'DSC 8849 kopie 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_8871-kopie-2.jpg', 
                title: 'DSC 8871 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9043-kopie-2.jpg', 
                title: 'DSC 9043 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9063-kopieren-2.jpg', 
                title: 'DSC 9063 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9094-kopie-2.jpg', 
                title: 'DSC 9094 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9104-kopieren.jpg', 
                title: 'DSC 9104 kopieren', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9112-kopie.jpg', 
                title: 'DSC 9112 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9141-kopieren-3.jpg', 
                title: 'DSC 9141 kopieren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9143-kopieren-2.jpg', 
                title: 'DSC 9143 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9154-kopieren-5.jpg', 
                title: 'DSC 9154 kopieren 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9170-kopieren-3.jpg', 
                title: 'DSC 9170 kopieren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9182-kopie.jpg', 
                title: 'DSC 9182 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9222-kopieren-2.jpg', 
                title: 'DSC 9222 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9242-kopie-9.jpg', 
                title: 'DSC 9242 kopie 9', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9246-kopie.jpg', 
                title: 'DSC 9246 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9246-kopieren-4.jpg', 
                title: 'DSC 9246 kopieren 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9266-kopieren-2.jpg', 
                title: 'DSC 9266 kopieren 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9296-kopie.jpg', 
                title: 'DSC 9296 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9315-kopieren-6.jpg', 
                title: 'DSC 9315 kopieren 6', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9433-kopie-2.jpg', 
                title: 'DSC 9433 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9516-kopie-2.jpg', 
                title: 'DSC 9516 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9646-kopie-3.jpg', 
                title: 'DSC 9646 kopie 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9733-kopie-2.jpg', 
                title: 'DSC 9733 kopie 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/DSC_9879-kopie.jpg', 
                title: 'DSC 9879 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Foto-afdrukken-Ans-Heisen-A-Custom.jpg', 
                title: 'Foto afdrukken Ans Heisen A Custom', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Foto-afdrukken-Ans-Heisen-B-Custom.jpg', 
                title: 'Foto afdrukken Ans Heisen B Custom', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Naamloos-1-bbb.jpg', 
                title: 'Naamloos 1 bbb', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Naamloos-1-gg.jpg', 
                title: 'Naamloos 1 gg', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Naamloos-1-lll.jpg', 
                title: 'Naamloos 1 lll', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Naamloos-2-kopieren-3.jpg', 
                title: 'Naamloos 2 kopieren 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Naamloos1-kopi_C3_ABren-zwart.jpg', 
                title: 'Naamloos1 kopi C3 ABren zwart', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Naamloos1-kopi_C3_ABrenzwart.jpg', 
                title: 'Naamloos1 kopi C3 ABrenzwart', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/Naamloos1zwart.jpg', 
                title: 'Naamloos1zwart', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-1.jpg', 
                title: 'ans 1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-10.jpg', 
                title: 'ans 10', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-3.jpg', 
                title: 'ans 3', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-4.jpg', 
                title: 'ans 4', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-5.jpg', 
                title: 'ans 5', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-6.jpg', 
                title: 'ans 6', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-7.jpg', 
                title: 'ans 7', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-8.jpg', 
                title: 'ans 8', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans-9.jpg', 
                title: 'ans 9', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/ans-heisen/ans2.jpg', 
                title: 'ans2', 
                category: 'all' 
            }
        ]
    },

    'Anne-Marie Dennissen': {
        name: 'Anne-Marie Dennissen',
        photos: [
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_4991-2.JPG', 
                title: 'AMD 4991 2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_5556.JPG', 
                title: 'AMD 5556', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_5559.JPG', 
                title: 'AMD 5559', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_5576.JPG', 
                title: 'AMD 5576', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_5618.JPG', 
                title: 'AMD 5618', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6557.JPG', 
                title: 'AMD 6557', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6589.JPG', 
                title: 'AMD 6589', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6594.JPG', 
                title: 'AMD 6594', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6705.JPG', 
                title: 'AMD 6705', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6715.JPG', 
                title: 'AMD 6715', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6720.JPG', 
                title: 'AMD 6720', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6741.JPG', 
                title: 'AMD 6741', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6749.JPG', 
                title: 'AMD 6749', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6761.JPG', 
                title: 'AMD 6761', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6766.JPG', 
                title: 'AMD 6766', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6768.JPG', 
                title: 'AMD 6768', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_6793.JPG', 
                title: 'AMD 6793', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_7087.JPG', 
                title: 'AMD 7087', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_7088.JPG', 
                title: 'AMD 7088', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_7093.JPG', 
                title: 'AMD 7093', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_7102.JPG', 
                title: 'AMD 7102', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_7107.JPG', 
                title: 'AMD 7107', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anne-marie-dennissen/AMD_7128.JPG', 
                title: 'AMD 7128', 
                category: 'all' 
            }
        ]
    },

    'Anja Versteegen': {
        name: 'Anja Versteegen',
        photos: [
            { 
                src: 'images/portfolio/anja-versteegen/1.jpg', 
                title: '1', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/2.jpg', 
                title: '2', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/4-kopie.jpg', 
                title: '4 kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_0207.JPG', 
                title: 'DSC 0207', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_0214.JPG', 
                title: 'DSC 0214', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_0220.JPG', 
                title: 'DSC 0220', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_1528.JPG', 
                title: 'DSC 1528', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_1961.JPG', 
                title: 'DSC 1961', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_4321.JPG', 
                title: 'DSC 4321', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_4326.JPG', 
                title: 'DSC 4326', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_4331.JPG', 
                title: 'DSC 4331', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6009.jpg', 
                title: 'DSC 6009', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6029.jpg', 
                title: 'DSC 6029', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6032.jpg', 
                title: 'DSC 6032', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6034.jpg', 
                title: 'DSC 6034', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6046.jpg', 
                title: 'DSC 6046', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6049.jpg', 
                title: 'DSC 6049', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6627.JPG', 
                title: 'DSC 6627', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6632.JPG', 
                title: 'DSC 6632', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6640.JPG', 
                title: 'DSC 6640', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6646.JPG', 
                title: 'DSC 6646', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6656.JPG', 
                title: 'DSC 6656', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6662.JPG', 
                title: 'DSC 6662', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_6666.JPG', 
                title: 'DSC 6666', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_7126.JPG', 
                title: 'DSC 7126', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_8161.JPG', 
                title: 'DSC 8161', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/DSC_8509.JPG', 
                title: 'DSC 8509', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/P1070314.JPG', 
                title: 'P1070314', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/P1070518.JPG', 
                title: 'P1070518', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/P1070541.JPG', 
                title: 'P1070541', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/P1070543.JPG', 
                title: 'P1070543', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/P1070784.JPG', 
                title: 'P1070784', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/P1070792.JPG', 
                title: 'P1070792', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/anja-versteegen/pestvogel.JPG', 
                title: 'pestvogel', 
                category: 'all' 
            }
        ]
    },

    'albert van der Meij': {
        name: 'albert van der Meij',
        photos: [
            { 
                src: 'images/portfolio/albert-van-der-meij/1_2025-11-23nov-Oosterbeek-Hemelsberg-GB-DSC_2223.JPG', 
                title: '1 2025 11 23nov Oosterbeek Hemelsberg GB DSC 2223', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_09_03sep-foto-workshop-_001.JPG', 
                title: '2016 09 03sep foto workshop 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_09_03sep-foto-workshop-_002.JPG', 
                title: '2016 09 03sep foto workshop 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_09_03sep-foto-workshop-_003.jpg', 
                title: '2016 09 03sep foto workshop 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_09_03sep-foto-workshop-_004.JPG', 
                title: '2016 09 03sep foto workshop 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_10_15okt-foto-workshop_002.JPG', 
                title: '2016 10 15okt foto workshop 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_10_23okt-De-Zelfontspanners_001.JPG', 
                title: '2016 10 23okt De Zelfontspanners 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_10_23okt-De-Zelfontspanners_002.JPG', 
                title: '2016 10 23okt De Zelfontspanners 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_10_23okt-De-Zelfontspanners_003.JPG', 
                title: '2016 10 23okt De Zelfontspanners 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_001.JPG', 
                title: '2016 11 05nov foto workshop 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_002.JPG', 
                title: '2016 11 05nov foto workshop 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_003.JPG', 
                title: '2016 11 05nov foto workshop 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_004.JPG', 
                title: '2016 11 05nov foto workshop 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_005.JPG', 
                title: '2016 11 05nov foto workshop 005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_006.JPG', 
                title: '2016 11 05nov foto workshop 006', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_007.JPG', 
                title: '2016 11 05nov foto workshop 007', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_008.JPG', 
                title: '2016 11 05nov foto workshop 008', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_009.JPG', 
                title: '2016 11 05nov foto workshop 009', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_010.JPG', 
                title: '2016 11 05nov foto workshop 010', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_011.JPG', 
                title: '2016 11 05nov foto workshop 011', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_05nov-foto-workshop_012.JPG', 
                title: '2016 11 05nov foto workshop 012', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_001.JPG', 
                title: '2016 11 27nov de Zelfontspanners 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_002.JPG', 
                title: '2016 11 27nov de Zelfontspanners 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_003.JPG', 
                title: '2016 11 27nov de Zelfontspanners 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_004.JPG', 
                title: '2016 11 27nov de Zelfontspanners 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_005.JPG', 
                title: '2016 11 27nov de Zelfontspanners 005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_006.JPG', 
                title: '2016 11 27nov de Zelfontspanners 006', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_007.JPG', 
                title: '2016 11 27nov de Zelfontspanners 007', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_008.JPG', 
                title: '2016 11 27nov de Zelfontspanners 008', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_009.JPG', 
                title: '2016 11 27nov de Zelfontspanners 009', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2016_11_27nov-de-Zelfontspanners_011.JPG', 
                title: '2016 11 27nov de Zelfontspanners 011', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_01_21jan-FotoRoos-workshop_001.JPG', 
                title: '2017 01 21jan FotoRoos workshop 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_02_04feb-FotoRoos-workshop_001.JPG', 
                title: '2017 02 04feb FotoRoos workshop 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_03_10mrt_Nijmegen_002.JPG', 
                title: '2017 03 10mrt Nijmegen 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_03_10mrt_Nijmegen_003.JPG', 
                title: '2017 03 10mrt Nijmegen 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_03_27mrt2017-tuin-WbD_001c.jpg', 
                title: '2017 03 27mrt2017 tuin WbD 001c', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_001a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 001a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_002a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 002a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_003a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 003a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_004a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 004a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_005a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 005a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_006a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 006a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_007a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 007a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_008a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 008a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_009a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 009a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_010a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 010a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_011a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 011a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_012a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 012a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_013a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 013a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_014a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 014a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_015a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 015a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_016a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 016a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_017a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 017a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_018a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 018a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_019a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 019a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04-Nijmegen-Driehuizerweg-pub01_020a.jpg', 
                title: '2017 04 Nijmegen Driehuizerweg pub01 020a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_07apr_HoogCatharijne-Utrecht-_001.JPG', 
                title: '2017 04 07apr HoogCatharijne Utrecht 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_07apr_HoogCatharijne-Utrecht-_002.JPG', 
                title: '2017 04 07apr HoogCatharijne Utrecht 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_07apr_HoogCatharijne-Utrecht-_003.JPG', 
                title: '2017 04 07apr HoogCatharijne Utrecht 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_07apr_HoogCatharijne-Utrecht-_004.JPG', 
                title: '2017 04 07apr HoogCatharijne Utrecht 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Amersfoort_001.JPG', 
                title: '2017 04 15apr Amersfoort 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_001.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_005.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_006.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 006', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_007.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 007', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_008.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 008', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_011.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 011', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_012.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 012', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_013.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 013', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_014.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 014', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_015.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 015', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_016.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 016', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_018.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 018', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_019.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 019', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_020.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 020', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_022.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 022', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_023.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 023', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_025.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 025', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_15apr_Eeemnes_Eemland-wandeling-_028.JPG', 
                title: '2017 04 15apr Eeemnes Eemland wandeling 028', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_22apr_fietsexcursie-NatuurMilieu-WbD-_001.JPG', 
                title: '2017 04 22apr fietsexcursie NatuurMilieu WbD 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_22apr_fietsexcursie-NatuurMilieu-WbD-_002.JPG', 
                title: '2017 04 22apr fietsexcursie NatuurMilieu WbD 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_22apr_fietsexcursie-NatuurMilieu-WbD-_003.JPG', 
                title: '2017 04 22apr fietsexcursie NatuurMilieu WbD 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_22apr_fietsexcursie-NatuurMilieu-WbD-_004.JPG', 
                title: '2017 04 22apr fietsexcursie NatuurMilieu WbD 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2017_04_22apr_fietsexcursie-NatuurMilieu-WbD-_005.JPG', 
                title: '2017 04 22apr fietsexcursie NatuurMilieu WbD 005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-01-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 01 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-02-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 02 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-04-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 04 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-06-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 06 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-07-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 07 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-08-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 08 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-09-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 09 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-10-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 10 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-11-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 11 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-12-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 12 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-13-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 13 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-14-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 14 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-15-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 15 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-18-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 18 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-19-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 19 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-20-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 20 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-22-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 22 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-23-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 23 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-24-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 24 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-25-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 25 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-26-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 26 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-27-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 27 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-28-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 28 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2019-10-20-Anholter-Schweiz-Isselburg-29-web.jpg', 
                title: '2019 10 20 Anholter Schweiz Isselburg 29 web', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1482-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1482 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1489-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1489 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1493-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1493 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1496-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1496 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1500-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1500 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1501-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1501 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1512-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1512 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1517-bew01L02-uitsnede-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1517 bew01L02 uitsnede Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1518-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1518 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_1527-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 1527 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5100-bew01L02-uitsnede-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5100 bew01L02 uitsnede Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5106-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5106 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5126-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5126 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5130-bew01L02-uitsnede-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5130 bew01L02 uitsnede Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5134-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5134 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5173-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5173 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5181-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5181 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5184-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5184 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5199-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5199 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5200-bew01L02-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5200 bew01L02 Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2020-07-26-DSC_5209-bew01L02-uitsnede-Voorst-BeekzichtIJssel.jpg', 
                title: '2020 07 26 DSC 5209 bew01L02 uitsnede Voorst BeekzichtIJssel', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-09-17sep-Rozendaalseveld-GC-NZ6II-14-30mm-DSC_3627.JPG', 
                title: '2023 09 17sep Rozendaalseveld GC NZ6II 14 30mm DSC 3627', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-09-17sep-Rozendaalseveld-GC-NZ6II-14-30mm-DSC_3628.JPG', 
                title: '2023 09 17sep Rozendaalseveld GC NZ6II 14 30mm DSC 3628', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-09-17sep-Rozendaalseveld-GC-NZ6II-14-30mm-DSC_3634.JPG', 
                title: '2023 09 17sep Rozendaalseveld GC NZ6II 14 30mm DSC 3634', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-09-17sep-Rozendaalseveld-GC-NZ6II-14-30mm-DSC_3635.JPG', 
                title: '2023 09 17sep Rozendaalseveld GC NZ6II 14 30mm DSC 3635', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-09-17sep-Rozendaalseveld-GC-NZ6II-14-30mm-DSC_3637.JPG', 
                title: '2023 09 17sep Rozendaalseveld GC NZ6II 14 30mm DSC 3637', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-10-15okt-WandelbosTilburg-DSC_2268.JPG', 
                title: '2023 10 15okt WandelbosTilburg DSC 2268', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-10-15okt-WandelbosTilburg-DSC_2279.JPG', 
                title: '2023 10 15okt WandelbosTilburg DSC 2279', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-10-15okt-WandelbosTilburg-DSC_2284.JPG', 
                title: '2023 10 15okt WandelbosTilburg DSC 2284', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-10-15okt-WandelbosTilburg-DSC_2312.JPG', 
                title: '2023 10 15okt WandelbosTilburg DSC 2312', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-10-15okt-WandelbosTilburg-DSC_2342.JPG', 
                title: '2023 10 15okt WandelbosTilburg DSC 2342', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-11-19nov-Loenermark-DSC_4364.JPG', 
                title: '2023 11 19nov Loenermark DSC 4364', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-11-19nov-Loenermark-DSC_4367.JPG', 
                title: '2023 11 19nov Loenermark DSC 4367', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-11-19nov-Loenermark-DSC_4369.JPG', 
                title: '2023 11 19nov Loenermark DSC 4369', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-11-19nov-Loenermark-DSC_4370.JPG', 
                title: '2023 11 19nov Loenermark DSC 4370', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-11-19nov-Loenermark-DSC_4380.JPG', 
                title: '2023 11 19nov Loenermark DSC 4380', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-Kroondomein-HetLoo_4595.JPG', 
                title: '2023 12 17dec Kroondomein HetLoo 4595', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4622.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4622', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4623.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4623', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4659.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4659', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4662.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4662', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4668.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4668', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4680.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4680', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4682.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4682', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4705.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4705', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4734.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4734', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2023-12-17dec-van1350u-Apeldoorn-HetLoo_4738.JPG', 
                title: '2023 12 17dec van1350u Apeldoorn HetLoo 4738', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam01-Haven01-DSC_4978.JPG', 
                title: '2024 01 20jan Rotterdam01 Haven01 DSC 4978', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam02-Haven02-DSC_4981.JPG', 
                title: '2024 01 20jan Rotterdam02 Haven02 DSC 4981', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam03-MarathonbeeldKoopvaardijmonument-DSC_5011.JPG', 
                title: '2024 01 20jan Rotterdam03 MarathonbeeldKoopvaardijmonument DSC 5011', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam04-Erasmusbrug-DSC_5014.JPG', 
                title: '2024 01 20jan Rotterdam04 Erasmusbrug DSC 5014', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam05-Willemsbrug-DSC_5023.JPG', 
                title: '2024 01 20jan Rotterdam05 Willemsbrug DSC 5023', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam06-Kubuswoningen-DSC_5032.JPG', 
                title: '2024 01 20jan Rotterdam06 Kubuswoningen DSC 5032', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam07-ErasmusbrugZalmhaventoren-DSC_5054.JPG', 
                title: '2024 01 20jan Rotterdam07 ErasmusbrugZalmhaventoren DSC 5054', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam08-Koningshavenbrug_DeHef-DSC_5071.JPG', 
                title: '2024 01 20jan Rotterdam08 Koningshavenbrug DeHef DSC 5071', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam09-Willemsbrug-DSC_5074.JPG', 
                title: '2024 01 20jan Rotterdam09 Willemsbrug DSC 5074', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam10-Willemsbrug-DSC_5087.JPG', 
                title: '2024 01 20jan Rotterdam10 Willemsbrug DSC 5087', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam11-OudeHaven-DSC_5089.JPG', 
                title: '2024 01 20jan Rotterdam11 OudeHaven DSC 5089', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-01-20jan-Rotterdam12-Kubuswoningen-DSC_5093.JPG', 
                title: '2024 01 20jan Rotterdam12 Kubuswoningen DSC 5093', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_ND750_GC30-DSC_3080.JPG', 
                title: '2024 02 25feb WekeromseZand Zont ND750 GC30 DSC 3080', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_ND750_GC30-DSC_3084.JPG', 
                title: '2024 02 25feb WekeromseZand Zont ND750 GC30 DSC 3084', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_ND750_GC30-DSC_3087.JPG', 
                title: '2024 02 25feb WekeromseZand Zont ND750 GC30 DSC 3087', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5376.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5376', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5377.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5377', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5378.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5378', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5380.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5380', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5391.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5391', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5402.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5402', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5403.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5403', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5414.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5414', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-02-25feb-WekeromseZand-Zont_NZ6II-14-30mm_GC30-DSC_5416.JPG', 
                title: '2024 02 25feb WekeromseZand Zont NZ6II 14 30mm GC30 DSC 5416', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-04-21apr-Beekdal-Renkum_NZ6II-GK-DSC_6001.JPG', 
                title: '2024 04 21apr Beekdal Renkum NZ6II GK DSC 6001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-04-21apr-Beekdal-Renkum_NZ6II-GK-DSC_6008.JPG', 
                title: '2024 04 21apr Beekdal Renkum NZ6II GK DSC 6008', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-04-21apr-Beekdal-Renkum_NZ6II-GK-DSC_6010.JPG', 
                title: '2024 04 21apr Beekdal Renkum NZ6II GK DSC 6010', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-04-21apr-Beekdal-Renkum_NZ6II-GK-DSC_6037.JPG', 
                title: '2024 04 21apr Beekdal Renkum NZ6II GK DSC 6037', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-04-21apr-Beekdal-Renkum_NZ6II-GK-DSC_6040.JPG', 
                title: '2024 04 21apr Beekdal Renkum NZ6II GK DSC 6040', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-04-21apr-Beekdal-Renkum_NZ6II-GK-DSC_6048.JPG', 
                title: '2024 04 21apr Beekdal Renkum NZ6II GK DSC 6048', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-04-21apr-Beekdal-Renkum_NZ6II-GK02-DSC_6027.JPG', 
                title: '2024 04 21apr Beekdal Renkum NZ6II GK02 DSC 6027', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-30cm-DSC_3186-02.JPG', 
                title: '2024 07 21jul Werftweg Bennekom 30cm DSC 3186 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-30cm-DSC_3191.JPG', 
                title: '2024 07 21jul Werftweg Bennekom 30cm DSC 3191', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-30cm-DSC_3215.JPG', 
                title: '2024 07 21jul Werftweg Bennekom 30cm DSC 3215', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-30cm-DSC_3236.JPG', 
                title: '2024 07 21jul Werftweg Bennekom 30cm DSC 3236', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-30cm-DSC_3239.JPG', 
                title: '2024 07 21jul Werftweg Bennekom 30cm DSC 3239', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-ND500-200-500mm-GK30-DSC_3271.JPG', 
                title: '2024 07 21jul Werftweg Bennekom ND500 200 500mm GK30 DSC 3271', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-ND500-200-500mm-GK30-DSC_3303-02.JPG', 
                title: '2024 07 21jul Werftweg Bennekom ND500 200 500mm GK30 DSC 3303 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-ND500-200-500mm-GK30-DSC_3355.JPG', 
                title: '2024 07 21jul Werftweg Bennekom ND500 200 500mm GK30 DSC 3355', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-ND500-200-500mm-GK30-DSC_3361-02.JPG', 
                title: '2024 07 21jul Werftweg Bennekom ND500 200 500mm GK30 DSC 3361 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-ND500-200-500mm-GK30-DSC_3363.JPG', 
                title: '2024 07 21jul Werftweg Bennekom ND500 200 500mm GK30 DSC 3363', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-ND500-200-500mm-GK30-DSC_3392.JPG', 
                title: '2024 07 21jul Werftweg Bennekom ND500 200 500mm GK30 DSC 3392', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-ND500-200-500mm-GK30-DSC_3397.JPG', 
                title: '2024 07 21jul Werftweg Bennekom ND500 200 500mm GK30 DSC 3397', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-07-21jul-Werftweg-Bennekom-ND500-200-500mm-GK30-DSC_3420.JPG', 
                title: '2024 07 21jul Werftweg Bennekom ND500 200 500mm GK30 DSC 3420', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-11-17nov-Speulderbos01-Zont-NZ6II-HC-DSC_1653.JPG', 
                title: '2024 11 17nov Speulderbos01 Zont NZ6II HC DSC 1653', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-11-17nov-Speulderbos02-Zont-NZ6II-HC-DSC_1659-02.JPG', 
                title: '2024 11 17nov Speulderbos02 Zont NZ6II HC DSC 1659 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-11-17nov-Speulderbos03-Zont-NZ6II-HC-DSC_1660-02.JPG', 
                title: '2024 11 17nov Speulderbos03 Zont NZ6II HC DSC 1660 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-11-17nov-Speulderbos04-Zont-NZ6II-HC-DSC_1673.JPG', 
                title: '2024 11 17nov Speulderbos04 Zont NZ6II HC DSC 1673', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-11-17nov-Speulderbos05-Zont-NZ6II-HC-DSC_1676.JPG', 
                title: '2024 11 17nov Speulderbos05 Zont NZ6II HC DSC 1676', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4438-001.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4438 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4440-003.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4440 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4448-02-006.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4448 02 006', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4454-008.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4454 008', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4458-010.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4458 010', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4460-011.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4460 011', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4466-012.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4466 012', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4468-013.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4468 013', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4487-018.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4487 018', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2024-12-15dec-Otterlo-PlankenWambuis-Zont-HC-DSC_4491-020.jpg', 
                title: '2024 12 15dec Otterlo PlankenWambuis Zont HC DSC 4491 020', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0845-001.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0845 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0849-002.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0849 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0851-003.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0851 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0854-004.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0854 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0858-005.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0858 005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0861-006.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0861 006', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0865-007.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0865 007', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0866-008.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0866 008', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0872-009.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0872 009', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-03jan-Orientales-BergenDal-NZ6III-HC-DSC_0885-02-010.jpg', 
                title: '2025 01 03jan Orientales BergenDal NZ6III HC DSC 0885 02 010', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-26jan-OnzaligeBossenDeSteeg-U-DSC_0967-01.jpg', 
                title: '2025 01 26jan OnzaligeBossenDeSteeg U DSC 0967 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-26jan-OnzaligeBossenDeSteeg-U-DSC_0970-02.jpg', 
                title: '2025 01 26jan OnzaligeBossenDeSteeg U DSC 0970 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-26jan-OnzaligeBossenDeSteeg-U-DSC_0978-03.jpg', 
                title: '2025 01 26jan OnzaligeBossenDeSteeg U DSC 0978 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-26jan-OnzaligeBossenDeSteeg-U-DSC_0990-04.jpg', 
                title: '2025 01 26jan OnzaligeBossenDeSteeg U DSC 0990 04', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-01-26jan-OnzaligeBossenDeSteeg-U-DSC_0993-05.jpg', 
                title: '2025 01 26jan OnzaligeBossenDeSteeg U DSC 0993 05', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_2897-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 2897 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_2907-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 2907 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_2995-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 2995 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_3043-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 3043 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_3147-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 3147 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_3536-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 3536 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_3608-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 3608 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_3981-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 3981 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_4054-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 4054 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_4344-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 4344 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_4595-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 4595 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-04-13apr0930u-Lunteren-DeValk-Zont-GC-DSC_4965-02.JPG', 
                title: '2025 04 13apr0930u Lunteren DeValk Zont GC DSC 4965 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5403-02.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5403 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5427.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5427', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5437-02.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5437 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5440.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5440', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5457-03.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5457 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5467-02.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5467 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5525.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5525', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5529-02-Kopie.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5529 02 Kopie', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5535.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5535', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-05-25mei-Arboretum-Wageningen_mo-GK-DSC_5544-03.JPG', 
                title: '2025 05 25mei Arboretum Wageningen mo GK DSC 5544 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-17jul-Stippelberg-DeRips-DSC_6753.JPG', 
                title: '2025 07 17jul Stippelberg DeRips DSC 6753', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-17jul-Stippelberg-DeRips-DSC_6767.JPG', 
                title: '2025 07 17jul Stippelberg DeRips DSC 6767', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-17jul-Stippelberg-DeRips-DSC_6769-02.JPG', 
                title: '2025 07 17jul Stippelberg DeRips DSC 6769 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-17jul-Stippelberg-DeRips-DSC_6923-02.JPG', 
                title: '2025 07 17jul Stippelberg DeRips DSC 6923 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-17jul-Stippelberg-DeRips-DSC_6934.JPG', 
                title: '2025 07 17jul Stippelberg DeRips DSC 6934', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-17jul-Stippelberg-DeRips-DSC_6947.JPG', 
                title: '2025 07 17jul Stippelberg DeRips DSC 6947', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-17jul-Stippelberg-DeRips-DSC_7012-02.JPG', 
                title: '2025 07 17jul Stippelberg DeRips DSC 7012 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-17jul-Stippelberg-DeRips-DSC_7032.JPG', 
                title: '2025 07 17jul Stippelberg DeRips DSC 7032', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-27jul-Wellerlooi-OpdenHamer-Zont-NZ6III-GK30-DSC_7094-02.JPG', 
                title: '2025 07 27jul Wellerlooi OpdenHamer Zont NZ6III GK30 DSC 7094 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-27jul-Wellerlooi-OpdenHamer-Zont-NZ6III-GK30-DSC_7100.JPG', 
                title: '2025 07 27jul Wellerlooi OpdenHamer Zont NZ6III GK30 DSC 7100', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-27jul-Wellerlooi-OpdenHamer-Zont-NZ6III-GK30-DSC_7146.JPG', 
                title: '2025 07 27jul Wellerlooi OpdenHamer Zont NZ6III GK30 DSC 7146', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-27jul-Wellerlooi-OpdenHamer-Zont-NZ6III-GK30-DSC_7170.JPG', 
                title: '2025 07 27jul Wellerlooi OpdenHamer Zont NZ6III GK30 DSC 7170', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-27jul-Wellerlooi-OpdenHamer-Zont-NZ6III-GK30-DSC_7270.JPG', 
                title: '2025 07 27jul Wellerlooi OpdenHamer Zont NZ6III GK30 DSC 7270', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-27jul-Wellerlooi-OpdenHamer-Zont-NZ6III-GK30-DSC_7278.JPG', 
                title: '2025 07 27jul Wellerlooi OpdenHamer Zont NZ6III GK30 DSC 7278', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-27jul-Wellerlooi-OpdenHamer-Zont-NZ6III-GK30-DSC_7317.JPG', 
                title: '2025 07 27jul Wellerlooi OpdenHamer Zont NZ6III GK30 DSC 7317', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-07-27jul-Wellerlooi-OpdenHamer-Zont-NZ6III-GK30-DSC_7344.JPG', 
                title: '2025 07 27jul Wellerlooi OpdenHamer Zont NZ6III GK30 DSC 7344', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-08-24aug-Belversven-Oisterwijk-Zont-RAW-ND500-GK30-DSC_4513.JPG', 
                title: '2025 08 24aug Belversven Oisterwijk Zont RAW ND500 GK30 DSC 4513', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-08-24aug-Belversven-Oisterwijk-Zont-RAW-ND500-GK30-DSC_4523.JPG', 
                title: '2025 08 24aug Belversven Oisterwijk Zont RAW ND500 GK30 DSC 4523', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-08-24aug-Belversven-Oisterwijk-Zont-RAW-ND500-GK30-DSC_4543.JPG', 
                title: '2025 08 24aug Belversven Oisterwijk Zont RAW ND500 GK30 DSC 4543', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-08-24aug-Belversven-Oisterwijk-Zont-RAW-ND500-GK30-DSC_4573.JPG', 
                title: '2025 08 24aug Belversven Oisterwijk Zont RAW ND500 GK30 DSC 4573', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-08-24aug-mi-Belversven-Oisterwijk-Zont-RAW-ND500-U-DSC_8370.JPG', 
                title: '2025 08 24aug mi Belversven Oisterwijk Zont RAW ND500 U DSC 8370', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-09-28sep-Weurt-uiterwaard-Zont-GK-DSC_9215-02.JPG', 
                title: '2025 09 28sep Weurt uiterwaard Zont GK DSC 9215 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-09-28sep-Weurt-uiterwaard-Zont-GK-DSC_9249.JPG', 
                title: '2025 09 28sep Weurt uiterwaard Zont GK DSC 9249', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-09-28sep-Weurt-uiterwaard-Zont-GK-DSC_9287.JPG', 
                title: '2025 09 28sep Weurt uiterwaard Zont GK DSC 9287', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-09-28sep-Weurt-uiterwaard-Zont-GK-DSC_9326.JPG', 
                title: '2025 09 28sep Weurt uiterwaard Zont GK DSC 9326', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-09-28sep-Weurt-uiterwaard-Zont-U-DSC_9337-02.JPG', 
                title: '2025 09 28sep Weurt uiterwaard Zont U DSC 9337 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-10-22okt-Ouwehand-Rhenen-GK30-DSC_1137.jpeg', 
                title: '2025 10 22okt Ouwehand Rhenen GK30 DSC 1137', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_01.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_02.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_03.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_04.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 04', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_05.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 05', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_06.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 06', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_07.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 07', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_08.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 08', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_09.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 09', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-Ab_10.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg Ab 10', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/2025-11-23nov-Oosterbeek-Hemelsberg-GB-DSC_2223.JPG', 
                title: '2025 11 23nov Oosterbeek Hemelsberg GB DSC 2223', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4519.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4519', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4527.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4527', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4530.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4530', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4547.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4547', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4554.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4554', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4571.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4571', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4590.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4590', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4592-02.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4592 02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4595.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4595', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4598.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4598', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4605.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4605', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/Ab-van-der-Meij-2023-12-17dec-Kroondomein-HetLoo_4619.JPG', 
                title: 'Ab van der Meij 2023 12 17dec Kroondomein HetLoo 4619', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC-4218_bew001a.jpg', 
                title: 'DSC 4218 bew001a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0159-HatertseVennen001a.jpg', 
                title: 'DSC 0159 HatertseVennen001a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0164-HatertseVennen002a.jpg', 
                title: 'DSC 0164 HatertseVennen002a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0170-HatertseVennen003a.jpg', 
                title: 'DSC 0170 HatertseVennen003a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0175-HatertseVennen004a.jpg', 
                title: 'DSC 0175 HatertseVennen004a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0180-HatertseVennen006a.jpg', 
                title: 'DSC 0180 HatertseVennen006a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0182-HatertseVennen008a.jpg', 
                title: 'DSC 0182 HatertseVennen008a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0184-HatertseVennen010a.jpg', 
                title: 'DSC 0184 HatertseVennen010a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0186-HatertseVennen011a.jpg', 
                title: 'DSC 0186 HatertseVennen011a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0188-HatertseVennen013a.jpg', 
                title: 'DSC 0188 HatertseVennen013a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0193-HatertseVennen014a.jpg', 
                title: 'DSC 0193 HatertseVennen014a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0199-HatertseVennen015a.jpg', 
                title: 'DSC 0199 HatertseVennen015a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0207-HatertseVennen016a.jpg', 
                title: 'DSC 0207 HatertseVennen016a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0209-HatertseVennen017a.jpg', 
                title: 'DSC 0209 HatertseVennen017a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0210-HatertseVennen018a.jpg', 
                title: 'DSC 0210 HatertseVennen018a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0215-HatertseVennen019a.jpg', 
                title: 'DSC 0215 HatertseVennen019a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_0216-HatertseVennen020a.jpg', 
                title: 'DSC 0216 HatertseVennen020a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1205-ElyzeeseVelden-Nijmegen-001.jpg', 
                title: 'DSC 1205 ElyzeeseVelden Nijmegen 001', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1209-ElyzeeseVelden-Nijmegen-002.jpg', 
                title: 'DSC 1209 ElyzeeseVelden Nijmegen 002', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1211-ElyzeeseVelden-Nijmegen-003.jpg', 
                title: 'DSC 1211 ElyzeeseVelden Nijmegen 003', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1212-ElyzeeseVelden-Nijmegen-004.jpg', 
                title: 'DSC 1212 ElyzeeseVelden Nijmegen 004', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1220-ElyzeeseVeldenNijmegen0019-22apr2018-gew01a01.jpg', 
                title: 'DSC 1220 ElyzeeseVeldenNijmegen0019 22apr2018 gew01a01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1222-ElyzeeseVeldenNijmegen0021-22apr2018-gew01a02.jpg', 
                title: 'DSC 1222 ElyzeeseVeldenNijmegen0021 22apr2018 gew01a02', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1225-ElyzeeseVeldenNijmegen0024-22apr2018-gew01a03.jpg', 
                title: 'DSC 1225 ElyzeeseVeldenNijmegen0024 22apr2018 gew01a03', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1231-ElyzeeseVeldenNijmegen0030-22apr2018-gew01a04.jpg', 
                title: 'DSC 1231 ElyzeeseVeldenNijmegen0030 22apr2018 gew01a04', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1233-ElyzeeseVelden-Nijmegen-005.jpg', 
                title: 'DSC 1233 ElyzeeseVelden Nijmegen 005', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1236-ElyzeeseVelden-Nijmegen-006.jpg', 
                title: 'DSC 1236 ElyzeeseVelden Nijmegen 006', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1243-ElyzeeseVeldenNijmegen0042-22apr2018-gew01a05.jpg', 
                title: 'DSC 1243 ElyzeeseVeldenNijmegen0042 22apr2018 gew01a05', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1244-ElyzeeseVelden-Nijmegen-007.jpg', 
                title: 'DSC 1244 ElyzeeseVelden Nijmegen 007', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1246-ElyzeeseVelden-Nijmegen-008.jpg', 
                title: 'DSC 1246 ElyzeeseVelden Nijmegen 008', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1250-ElyzeeseVelden-Nijmegen-009.jpg', 
                title: 'DSC 1250 ElyzeeseVelden Nijmegen 009', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1251-ElyzeeseVeldenNijmegen0050-22apr2018-gew01a06.jpg', 
                title: 'DSC 1251 ElyzeeseVeldenNijmegen0050 22apr2018 gew01a06', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1252-ElyzeeseVeldenNijmegen0051-22apr2018-gew01a07.jpg', 
                title: 'DSC 1252 ElyzeeseVeldenNijmegen0051 22apr2018 gew01a07', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1255-ElyzeeseVelden-Nijmegen-010.jpg', 
                title: 'DSC 1255 ElyzeeseVelden Nijmegen 010', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1260-ElyzeeseVelden-Nijmegen-011.jpg', 
                title: 'DSC 1260 ElyzeeseVelden Nijmegen 011', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1265-ElyzeeseVelden-Nijmegen-012.jpg', 
                title: 'DSC 1265 ElyzeeseVelden Nijmegen 012', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1269-ElyzeeseVelden-Nijmegen-013.jpg', 
                title: 'DSC 1269 ElyzeeseVelden Nijmegen 013', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1270-ElyzeeseVelden-Nijmegen-014.jpg', 
                title: 'DSC 1270 ElyzeeseVelden Nijmegen 014', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1277-ElyzeeseVelden-Nijmegen-015.jpg', 
                title: 'DSC 1277 ElyzeeseVelden Nijmegen 015', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_1283-ElyzeeseVelden-Nijmegen-016.jpg', 
                title: 'DSC 1283 ElyzeeseVelden Nijmegen 016', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_3059_WbD-sep2016_bew_mrt2017.jpg', 
                title: 'DSC 3059 WbD sep2016 bew mrt2017', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4239_bew001a.jpg', 
                title: 'DSC 4239 bew001a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4266_gew001b.jpg', 
                title: 'DSC 4266 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4272_gew001b.jpg', 
                title: 'DSC 4272 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4275_gew001b.jpg', 
                title: 'DSC 4275 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4302_gew001b.jpg', 
                title: 'DSC 4302 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4306_gew001b.jpg', 
                title: 'DSC 4306 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4307_gew001b.jpg', 
                title: 'DSC 4307 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4311_gew001b.jpg', 
                title: 'DSC 4311 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4314_gew001b.jpg', 
                title: 'DSC 4314 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4321_gew001b.jpg', 
                title: 'DSC 4321 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4325_gew001b.jpg', 
                title: 'DSC 4325 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4328_gew001b.jpg', 
                title: 'DSC 4328 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_4334_gew001b.jpg', 
                title: 'DSC 4334 gew001b', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_5178-gew03L01-uitsnede02-a01.jpg', 
                title: 'DSC 5178 gew03L01 uitsnede02 a01', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_6367-2018-07-22jul-Zollverein-gew01a.jpg', 
                title: 'DSC 6367 2018 07 22jul Zollverein gew01a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_6375-2018-07-22jul-Zollverein-gew01a.jpg', 
                title: 'DSC 6375 2018 07 22jul Zollverein gew01a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_6381-2018-07-22jul-Zollverein-gew01a.jpg', 
                title: 'DSC 6381 2018 07 22jul Zollverein gew01a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_6412-2018-07-22jul-Zollverein-gew01a.jpg', 
                title: 'DSC 6412 2018 07 22jul Zollverein gew01a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_6425-2018-07-22jul-Zollverein-gew01a.jpg', 
                title: 'DSC 6425 2018 07 22jul Zollverein gew01a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7087-gew01L02a.jpg', 
                title: 'DSC 7087 gew01L02a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7089-gew01L04a-crop.jpg', 
                title: 'DSC 7089 gew01L04a crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7093-gew01L02a.jpg', 
                title: 'DSC 7093 gew01L02a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7096-gew01L02a.jpg', 
                title: 'DSC 7096 gew01L02a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7099-gew01L04a-crop.jpg', 
                title: 'DSC 7099 gew01L04a crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7102-gew01L02a-crop.jpg', 
                title: 'DSC 7102 gew01L02a crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7114-gew01L02a.jpg', 
                title: 'DSC 7114 gew01L02a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7129-gew01L02a.jpg', 
                title: 'DSC 7129 gew01L02a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7133-gew01L02a.jpg', 
                title: 'DSC 7133 gew01L02a', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7148-gew01L02a-crop.jpg', 
                title: 'DSC 7148 gew01L02a crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7170-gew01L02a-crop.jpg', 
                title: 'DSC 7170 gew01L02a crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7178-gew01L02a-crop.jpg', 
                title: 'DSC 7178 gew01L02a crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7182-gew01L02a-crop.jpg', 
                title: 'DSC 7182 gew01L02a crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7187-gew01L02a-crop.jpg', 
                title: 'DSC 7187 gew01L02a crop', 
                category: 'all' 
            },
            { 
                src: 'images/portfolio/albert-van-der-meij/DSC_7188-gew01L03a.jpg', 
                title: 'DSC 7188 gew01L03a', 
                category: 'all' 
            }
        ]
    },

    // Voeg hier portfolio foto's toe voor nieuwe leden...
};

// Helper function to normalize photo src for comparison
// Handles both Base64 URLs and file paths consistently
function normalizePhotoSrc(src) {
    if (!src) return '';
    
    const srcStr = String(src);
    
    // For Base64 URLs, use first 200 chars for comparison (enough to be unique)
    if (srcStr.startsWith('data:image')) {
        return srcStr.substring(0, 200);
    }
    
    // For file paths, normalize (lowercase, remove trailing slashes)
    return srcStr.toLowerCase().replace(/\/$/, '');
}

// Helper function to check if two photo srcs match (handles Base64 and file paths)
function photoSrcMatches(src1, src2) {
    if (!src1 || !src2) return false;
    
    const s1 = String(src1);
    const s2 = String(src2);
    
    // Exact match
    if (s1 === s2) return true;
    
    // For Base64 URLs, compare first 100 chars
    if (s1.startsWith('data:image') && s2.startsWith('data:image')) {
        return s1.substring(0, 100) === s2.substring(0, 100);
    }
    
    // For file paths, case-insensitive match
    if (!s1.startsWith('data:image') && !s2.startsWith('data:image')) {
        return s1.toLowerCase() === s2.toLowerCase();
    }
    
    return false;
}

// Load portfolio data from localStorage and merge with static data
// This is the single source of truth for portfolio data loading
function loadPortfolioData() {
    try {
        // Check if STATIC_PORTFOLIO_DATA exists
        if (typeof STATIC_PORTFOLIO_DATA === 'undefined' || !STATIC_PORTFOLIO_DATA) {
            console.warn('STATIC_PORTFOLIO_DATA is not defined, returning empty object');
            return {};
        }
        
        // Start with static data
        const staticData = JSON.parse(JSON.stringify(STATIC_PORTFOLIO_DATA));
        
        // Load hidden photos from localStorage (photos that were deleted)
        const hiddenPhotos = JSON.parse(localStorage.getItem('hiddenPortfolioPhotos') || '{}');
        
        // Load user-uploaded photos from localStorage
        const userData = JSON.parse(localStorage.getItem('portfolioData') || '{}');
        const orderData = JSON.parse(localStorage.getItem('portfolioOrder') || '{}');
        
        // Process each member in static data
        Object.keys(staticData).forEach(memberName => {
            const memberPhotos = staticData[memberName].photos || [];
            const savedOrder = orderData[memberName] || [];
            const hiddenForMember = hiddenPhotos[memberName] || [];
            
            // Filter out hidden photos from static photos
            const visibleStaticPhotos = memberPhotos.filter(photo => {
                return !hiddenForMember.some(hiddenSrc => photoSrcMatches(photo.src, hiddenSrc));
            });
            
            // Reorder static photos according to saved order
            if (savedOrder.length > 0) {
                const orderedStatic = [];
                const unorderedStatic = [];
                
                savedOrder.forEach(src => {
                    const photo = visibleStaticPhotos.find(p => photoSrcMatches(p.src, src));
                    if (photo) orderedStatic.push(photo);
                });
                
                visibleStaticPhotos.forEach(photo => {
                    const isInOrder = savedOrder.some(src => photoSrcMatches(photo.src, src));
                    if (!isInOrder) {
                        unorderedStatic.push(photo);
                    }
                });
                
                staticData[memberName].photos = [...orderedStatic, ...unorderedStatic];
            } else {
                staticData[memberName].photos = visibleStaticPhotos;
            }
        });
        
        // Add user photos
        Object.keys(userData).forEach(memberName => {
            if (!staticData[memberName]) {
                staticData[memberName] = { name: memberName, photos: [] };
            }
            
            // Get hidden photos for this member
            const hiddenForMember = hiddenPhotos[memberName] || [];
            
            // Get existing static photos (already filtered for hidden photos)
            const existingPhotos = staticData[memberName].photos || [];
            
            // Update static photo titles with user-edited titles
            // Also handle photos that were edited (titles changed) but are originally static
            const userPhotosForTitles = userData[memberName] || [];
            const editedStaticPhotos = new Map(); // Track edited static photos by src
            
            existingPhotos.forEach(staticPhoto => {
                const staticSrc = String(staticPhoto.src || '');
                // Find matching user photo (for edited titles or metadata)
                const matchingUserPhoto = userPhotosForTitles.find(userPhoto => {
                    const userSrc = String(userPhoto.src || '');
                    return photoSrcMatches(userSrc, staticSrc);
                });
                
                // If found, update title (could be edited static photo or user-uploaded)
                if (matchingUserPhoto) {
                    // Always use the title from userData (user has edited it)
                    // This ensures edited titles are preserved over static titles
                    staticPhoto.title = matchingUserPhoto.title || staticPhoto.title;
                    // If it's not a user-uploaded photo, mark it as edited static photo
                    if (!matchingUserPhoto.isUserUploaded) {
                        editedStaticPhotos.set(staticSrc, matchingUserPhoto);
                    }
                }
            });
            
            // Add user photos to existing photos (filter out hidden ones and duplicates)
            // Only include truly new user-uploaded photos, not edited static photos
            const userPhotos = (userData[memberName] || []).filter(photo => {
                // Filter out hidden photos
                if (hiddenForMember.some(hiddenSrc => photoSrcMatches(photo.src, hiddenSrc))) {
                    return false;
                }
                
                // Only include if it's a user-uploaded photo (new photo, not edited static)
                if (photo.isUserUploaded === true) {
                    // Check if it's a duplicate of static photo
                    const isDuplicate = existingPhotos.some(existingPhoto => 
                        photoSrcMatches(existingPhoto.src, photo.src)
                    );
                    return !isDuplicate;
                }
                
                // For edited static photos (isUserUploaded === false), don't add as separate entry
                // The title is already updated in existingPhotos above
                return false;
            });
            
            // Combine all photos first (static + user)
            let allMemberPhotos = [...existingPhotos, ...userPhotos];
            
            // Additional duplicate check (safety net)
            const seenSrcs = new Set();
            allMemberPhotos = allMemberPhotos.filter(photo => {
                const src = String(photo.src || '');
                
                // For Base64 URLs, use first 100 chars for comparison
                const key = src.startsWith('data:image') ? src.substring(0, 100) : normalizePhotoSrc(src);
                
                if (seenSrcs.has(key)) {
                    console.log('Removing duplicate photo:', src.substring(0, 50));
                    return false;
                }
                seenSrcs.add(key);
                return true;
            });
            
            // Sort ALL photos by order (both static and user photos together)
            // Always use saved order if it exists, otherwise create one
            const savedOrder = orderData[memberName] || [];
            
            if (savedOrder.length > 0) {
                // Use saved order - this is the source of truth
                const orderedPhotos = [];
                const photoMap = new Map();
                
                // Create map with normalized keys for reliable matching
                allMemberPhotos.forEach(photo => {
                    const src = String(photo.src || '');
                    const key = src.startsWith('data:image') ? src.substring(0, 100) : normalizePhotoSrc(src);
                    photoMap.set(key, photo);
                });
                
                // First, add photos in the exact order from savedOrder
                savedOrder.forEach(savedSrc => {
                    const normalizedSavedSrc = savedSrc.startsWith('data:image') 
                        ? savedSrc.substring(0, 100) 
                        : normalizePhotoSrc(savedSrc);
                    
                    const photo = photoMap.get(normalizedSavedSrc);
                    if (photo) {
                        orderedPhotos.push(photo);
                        photoMap.delete(normalizedSavedSrc);
                    }
                });
                
                // Then add any photos that weren't in savedOrder (new photos) to the end
                const unorderedPhotos = Array.from(photoMap.values());
                
                // Final check: remove any duplicates that might have slipped through
                const finalPhotos = [...orderedPhotos, ...unorderedPhotos];
                const finalSeenSrcs = new Set();
                const uniquePhotos = finalPhotos.filter(photo => {
                    const src = String(photo.src || '');
                    const key = src.startsWith('data:image') ? src.substring(0, 100) : normalizePhotoSrc(src);
                    
                    if (finalSeenSrcs.has(key)) {
                        console.log(`Removing duplicate in final check for ${memberName}:`, src.substring(0, 50));
                        return false;
                    }
                    finalSeenSrcs.add(key);
                    return true;
                });
                
                staticData[memberName].photos = uniquePhotos;
                
                // Update savedOrder to include new photos that weren't in it
                if (unorderedPhotos.length > 0) {
                    const newOrder = [...savedOrder, ...unorderedPhotos.map(p => p.src)];
                    orderData[memberName] = newOrder;
                    localStorage.setItem('portfolioOrder', JSON.stringify(orderData));
                    console.log(`Updated order for ${memberName}: added ${unorderedPhotos.length} new photos`);
                }
            } else {
                // No saved order exists - create one based on current order
                // Sort by order property if available
                allMemberPhotos.sort((a, b) => {
                    if (a.order && b.order) {
                        return a.order - b.order;
                    }
                    if (a.order) return -1;
                    if (b.order) return 1;
                    return 0;
                });
                
                staticData[memberName].photos = allMemberPhotos;
                
                // Create initial order list
                const initialOrder = allMemberPhotos.map(p => p.src);
                orderData[memberName] = initialOrder;
                localStorage.setItem('portfolioOrder', JSON.stringify(orderData));
                console.log(`Created initial order for ${memberName}: ${initialOrder.length} photos`);
            }
        });
        
        return staticData;
    } catch (e) {
        console.error('Error loading portfolio data:', e);
        // Return static data as fallback, or empty object if STATIC_PORTFOLIO_DATA doesn't exist
        try {
            if (typeof STATIC_PORTFOLIO_DATA !== 'undefined' && STATIC_PORTFOLIO_DATA) {
                return JSON.parse(JSON.stringify(STATIC_PORTFOLIO_DATA));
            }
        } catch (parseError) {
            console.error('Error parsing STATIC_PORTFOLIO_DATA:', parseError);
        }
        return {};
    }
}

// Wrapper function for Next.js compatibility
// Accepts memberName parameter and returns portfolio data for that specific member
function loadPortfolioDataForMember(memberName) {
    if (!memberName) {
        return null;
    }
    
    try {
        const allData = loadPortfolioData();
        
        // Check if allData is null or undefined
        if (!allData) {
            return null;
        }
        
        const memberData = allData[memberName];
        
        if (!memberData) {
            return null;
        }
        
        return {
            name: memberData.name,
            photos: memberData.photos || []
        };
    } catch (e) {
        console.error('Error loading portfolio data for member:', e);
        return null;
    }
}

// Make functions available on window object for Next.js
if (typeof window !== 'undefined') {
    window.loadPortfolioData = loadPortfolioDataForMember;
    window.loadAllPortfolioData = loadPortfolioData;
    window.STATIC_PORTFOLIO_DATA = STATIC_PORTFOLIO_DATA;
}
