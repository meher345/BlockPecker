const goodsAndServicesList = {
  class1:
    "Chemical used in industry, science, photography, agriculture, horticulture and forestry; unprocessed artificial resins, unprocessed plastics; manures; fire extinguishing compositions; tempering and soldering preparations; chemical substances for preserving foodstuffs; tanning substances; adhesive used in industry",
  class2:
    "Paints, varnishes, lacquers; preservatives against rust and against deterioration of wood; colorants; mordents; raw natural resins; metals in foil and powder form for painters; decorators; printers and artists",
  class3:
    "Bleaching preparations and other substances for laundry use; cleaning; polishing; scouring and abrasive preparations; soaps; perfumery, essential oils, cosmetics, hair lotions, dentifrices",
  class4:
    "Industrial oils and greases; lubricants; dust absorbing, wetting and binding compositions; fuels (including motor spirit) and illuminants; candles, wicks",
  class5:
    "Pharmaceutical, veterinary and sanitary preparations; dietetic substances adapted for medical use, food for babies; plasters, materials for dressings; materials for stopping teeth, dental wax; disinfectants; preparation for destroying vermin; fungicides, herbicides",
  class6:
    "Common metals and their alloys; metal building materials; transportable buildings of metal; materials of metal for railway tracks; non-electric cables and wires of common metal; ironmongery, small items of metal hardware; pipes and tubes of metal; safes; goods of common metal not included in other classes; ores",
  class7:
    "Machines and machine tools; motors and engines (except for land vehicles); machine coupling and transmission components (except for land vehicles); agricultural implements other than hand-operated; incubators for eggs",
  class8:
    "Hand tools and implements (hand-operated); cutlery; side arms; razors",
  class9:
    "Scientific, nautical, surveying, electric, photographic, cinematographic, optical, weighing, measuring, signaling, checking (supervision), life saving and teaching apparatus and instruments; apparatus for recording, transmission or reproduction of sound or images; magnetic data carriers, recording discs; automatic vending machines and mechanisms for coin-operated apparatus; cash registers, calculating machines, data processing equipment and computers; fire extinguishing apparatus",
  class10:
    "Surgical, medical, dental and veterinary apparatus and instruments, artificial limbs, eyes and teeth; orthopedic articles; suture materials",
  class11:
    "Apparatus for lighting, heating, steam generating, cooking, refrigerating, drying ventilating, water supply and sanitary purposes",
  class12: "Vehicles; apparatus for locomotion by land, air or water",
  class13: "Firearms; ammunition and projectiles; explosives; fire works",
  class14:
    "Precious metals and their alloys and goods in precious metals or coated therewith, not included in other classes; jewellery, precious stones; horological and other chronometric instruments",
  class15: "Musical instruments",
  class16:
    "Paper, cardboard and goods made from these materials, not included in other classes; printed matter; bookbinding material; photographs; stationery; adhesives for stationery or household purposes; artists' materials; paint brushes; typewriters and office requisites (except furniture); instructional and teaching material (except apparatus); plastic materials for packaging (not included in other classes); playing cards; printers' type; printing blocks",
  class17:
    "Rubber, gutta percha, gum, asbestos, mica and goods made from these materials and not included in other classes; plastics in extruded form for use in manufacture; packing, stopping and insulating materials; flexible pipes, not of metal",
  class18:
    "Leather and imitations of leather, and goods made of these materials and not included in other classes; animal skins, hides, trunks and travelling bags; umbrellas, parasols and walking sticks; whips, harness and saddlery",
  class19:
    "Building materials, (non-metallic), non-metallic rigid pipes for building; asphalt, pitch and bitumen; non-metallic transportable buildings; monuments, not of metal.",
  class20:
    "Furniture, mirrors, picture frames; goods (not included in other classes) of wood, cork, reed, cane, wicker, horn, bone, ivory, whalebone, shell, amber, mother-of-pearl, meerschaum and substitutes for all these materials, or of plastics",
  class21:
    "Household or kitchen utensils and containers(not of precious metal or coated therewith); combs and sponges; brushes(except paints brushes); brush making materials; articles for cleaning purposes; steel-wool; unworked or semi-worked glass (except glass used in building); glassware, porcelain and earthenware not included in other classes",
  class22:
    "Ropes, string, nets, tents, awnings, tarpaulins, sails, sacks and bags (not included in other classes) padding and stuffing materials (except of rubber or plastics); raw fibrous textile materials",
  class23: "Yarns and threads, for textile use",
  class24:
    "Textiles and textile goods, not included in other classes; bed and table covers.",
  class25: "Clothing, footwear, headgear",
  class26:
    "Lace and embroidery, ribbons and braid; buttons, hooks and eyes, pins and needles; artificial flowers",
  class27:
    "Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; wall hangings (non-textile)",
  class28:
    "Games and playthings, gymnastic and sporting articles not included in other classes; decorations for Christmas trees",
  class29:
    "Meat, fish, poultry and game; meat extracts; preserved, dried and cooked fruits and vegetables; jellies, jams, fruit sauces; eggs, milk and milk products; edible oils and fats",
  class30:
    "Coffee, tea, cocoa, sugar, rice, tapioca, sago, artificial coffee; flour and preparations made from cereals, bread, pastry and confectionery, ices; honey, treacle; yeast, baking powder; salt, mustard; vinegar, sauces, (condiments); spices; ice",
  class31:
    "Agricultural, horticultural and forestry products and grains not included in other classes; live animals; fresh fruits and vegetables; seeds, natural plants and flowers; foodstuffs for animals, malt",
  class32:
    "Beers, mineral and aerated waters, and other non-alcoholic drinks; fruit drinks and fruit juices; syrups and other preparations for making beverages",
  class33: "Alcoholic beverages (except beers)",
  class34: "Tobacco, smokers' articles, matches",
  class35:
    "Advertising, business management, business administration, office functions.",
  class36:
    "Insurance, financial affairs; monetary affairs; real estate affairs.",
  class37: "Building construction; repair; installation services.",
  class38: "Telecommunications.",
  class39: "Transport; packaging and storage of goods; travel arrangement.",
  class40: "Treatment of materials.",
  class41:
    "Education; providing of training; entertainment; sporting and cultural activities.",
  class42:
    "Scientific and technological services and research and design relating thereto; industrial analysis and research services; design and development of computer hardware and software.",
  class43: "Services for providing food and drink; temporary accommodation.",
  class44:
    "Medical services, veterinary services, hygienic and beauty care for human beings or animals; agriculture, horticulture and forestry services.",
  class45:
    "Legal services; security services for the protection of property and individuals; personal and social services rendered by others to meet the needs of individuals."
};

export const GoodsAndServices = Object.keys(goodsAndServicesList).map(
  value => ({
    id: value,
    name: value,
    value: value,
    description: goodsAndServicesList[value],
    classType: Number(value.substring(5)) > 34 ? "Services" : "Goods"
  })
);
