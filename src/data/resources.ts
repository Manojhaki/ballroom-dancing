export interface ResourceLink {
  title: string;
  url: string;
  description: string;
}

export const officialSyllabi: ResourceLink[] = [
  {
    title: 'USA Dance: Appendix B Syllabus Guidebook',
    url: 'https://cdn.ymaws.com/usadance.org/resource/resmgr/dancesport/documents/rule_book/2025/app_b_25_w_pre-bronze_usa_da.pdf',
    description:
      'The official American Style approved figures, elements, and level restrictions (Pre-Bronze through Gold), published by USA Dance.',
  },
  {
    title: 'Dance Vision: American Smooth Bronze Syllabus Manual',
    url: 'https://shop.dancevision.com/products/american-smooth-bronze-syllabus-manual',
    description:
      "Dance Vision is USA Dance's preferred syllabus publisher for American Style. Covers Waltz, Tango, Foxtrot, and Viennese Waltz at Bronze level.",
  },
  {
    title: 'Dance Vision: American Rhythm Bronze Syllabus Manual',
    url: 'https://shop.dancevision.com/products/american-rhythm-bronze-syllabus-manual',
    description: 'Bronze-level figures for Cha Cha, Rumba, Swing, Bolero, and Mambo.',
  },
  {
    title: 'NDCA: Approved Figures, Elements & Restrictions',
    url: 'https://www.ndca.org/pdf/2023%20January%20-%205%20-%20NDCA%20APPROVED%20JAN%202023.pdf',
    description:
      'The official National Dance Council of America document governing International Standard and International Latin figures at every level.',
  },
  {
    title: 'NDCA International Style Latin Syllabus (video)',
    url: 'https://www.youtube.com/playlist?list=PL5WS73I5SiotPcgaF20DeDFB535852_Zu',
    description: 'Official NDCA YouTube playlist demonstrating the International Latin syllabus figures.',
  },
  {
    title: 'Collegiate DanceSport Association: Syllabus & Figure Resources',
    url: 'https://collegiatedancesport.org/syllabus-and-figure-resources/',
    description: 'A hub of syllabus references maintained for US collegiate ballroom teams.',
  },
];

export const freeManuals: ResourceLink[] = [
  {
    title: "Kevin Buell's Ballroom Dancing for Beginners, Vol. 1 (International Standard)",
    url: 'https://www.scribd.com/document/19959165/Ballroom-Dancing-for-Beginners-1',
    description:
      'A free introductory manual written for collegiate ballroom teams, covering Waltz, Tango, Foxtrot, Quickstep, and Viennese Waltz basics.',
  },
  {
    title: "Kevin Buell's Ballroom Dancing for Beginners, Vol. 2 (American Smooth)",
    url: 'https://www.scribd.com/document/423592504/Ballroom-dancing-for-beginners-Part-2-by-Kevin-Buell',
    description: 'The companion volume introducing American Style Smooth technique.',
  },
];

export const historyLinks: ResourceLink[] = [
  {
    title: 'An American Ballroom Companion: Dance Instruction Manuals, ca. 1490–1920',
    url: 'https://www.loc.gov/collections/dance-instruction-manuals-from-1490-to-1920/',
    description:
      "The Library of Congress's digitized collection of over 200 public-domain social dance manuals, spanning five centuries.",
  },
  {
    title: 'Video Directory: filmed illustrations of historical dance steps',
    url: 'https://www.loc.gov/collections/dance-instruction-manuals-from-1490-to-1920/articles-and-essays/video-directory/',
    description: '75 video clips illustrating figures described in the manuals above.',
  },
  {
    title: 'Western Social Dance: An Overview of the Collection',
    url: 'https://www.loc.gov/collections/dance-instruction-manuals-from-1490-to-1920/articles-and-essays/western-social-dance-an-overview-of-the-collection/',
    description: "An essay tracing social dance from the Renaissance through the early 20th century.",
  },
  {
    title: 'Library of Congress: Dance Research Guide, Digital Collections',
    url: 'https://guides.loc.gov/dance/digital-collections',
    description: 'A research guide indexing all LOC digital dance collections, not just ballroom.',
  },
];
