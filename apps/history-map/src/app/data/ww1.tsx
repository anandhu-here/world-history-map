// src/app/data/ww1Timeline.ts
import { Timeline, TimelineEvent } from '@world-history/core';

// First World War timeline data
const ww1Events: TimelineEvent[] = [
    {
        id: "assassination-franz-ferdinand",
        title: "Assassination of Archduke Franz Ferdinand",
        description: "World War I began after the assassination of Austrian Archduke Franz Ferdinand by South Slav nationalist Gavrilo Princip on June 28, 1914. Franz Ferdinand and his wife Sophie were shot during their visit to Sarajevo, the capital of the Austro-Hungarian province of Bosnia and Herzegovina.\n\nThis event would serve as the immediate catalyst that triggered the outbreak of the First World War, setting in motion a chain of events that would engulf Europe in conflict.",
        date: "1914-06-28",
        location: {
            coordinates: [18.4313, 43.8563], // Sarajevo
            name: "Sarajevo",
            country: "Austria-Hungary (now Bosnia and Herzegovina)"
        },
        media: [
            {
                type: "image",
                url: "/images/franz-ferdinand.png",
                caption: "Archduke Franz Ferdinand and his wife Sophie",
                credit: "Historical Archives"
            }
        ],
        importance: "critical",
        duration: 8000, // Display for 8 seconds during animation
        links: [
            {
                text: "Learn more about the assassination",
                url: "https://en.wikipedia.org/wiki/Assassination_of_Archduke_Franz_Ferdinand"
            }
        ],
        tags: ["catalyst", "austria-hungary", "balkans"]
    },
    {
        id: "austria-serbia-ultimatum",
        title: "Austria-Hungary's Ultimatum to Serbia",
        description: "Following the assassination of Archduke Franz Ferdinand, the Austro-Hungarian Empire believed Serbia was behind the plot. The assassination provided an opportunity for Austrian generals who had long sought to conquer Serbia.\n\nAustria-Hungary delivered a harsh ultimatum to Serbia, demanding that Austrian police be allowed to enter Serbia to continue the investigation into the assassination. Serbia rejected this specific demand, seeing it as a violation of their sovereignty, while accepting most other terms.\n\nThis rejection angered the rulers of Austria-Hungary, who were already determined to use the crisis as a pretext for war against Serbia.",
        date: "1914-07-23",
        location: {
            coordinates: [20.4568, 44.8125], // Belgrade, Serbia
            name: "Belgrade",
            country: "Kingdom of Serbia"
        },
        media: [
            {
                type: "image",
                url: "/assets/images/austria-ultimatum.jpg",
                caption: "Austrian officials delivering the ultimatum to Serbia",
                credit: "Historical Archives"
            }
        ],
        importance: "major",
        duration: 6000,
        links: [
            {
                text: "Learn more about the July Crisis",
                url: "https://en.wikipedia.org/wiki/July_Crisis"
            }
        ],
        tags: ["diplomacy", "ultimatum", "serbia", "austria-hungary"]
    },
    {
        id: "germany-supports-austria",
        title: "German 'Blank Cheque' to Austria-Hungary",
        description: "The assassination of Archduke Franz Ferdinand caused great anger among German leadership, particularly Kaiser Wilhelm II. The Kaiser viewed the assassination as both a crime against royal blood and an act of disobedience that required punishment. This reaction was intensified by his personal connection to the late Archduke, as Wilhelm II was Franz Ferdinand's godfather.\n\nGermany offered unconditional support to Austria-Hungary in whatever action they decided to take against Serbia, effectively issuing a 'blank cheque' that emboldened the Austro-Hungarian leadership in their aggressive stance. This German backing was crucial in Austria-Hungary's decision to pursue war, as it provided assurance against Russian intervention.",
        date: "1914-07-05",
        location: {
            coordinates: [13.4050, 52.5200], // Berlin, Germany
            name: "Berlin",
            country: "German Empire"
        },
        media: [
            {
                type: "image",
                url: "/assets/images/kaiser-wilhelm.jpg",
                caption: "Kaiser Wilhelm II of Germany",
                credit: "Imperial War Museum"
            }
        ],
        importance: "major",
        duration: 7000,
        links: [
            {
                text: "Learn about the Blank Cheque",
                url: "https://en.wikipedia.org/wiki/Blank_cheque"
            }
        ],
        tags: ["germany", "kaiser-wilhelm", "alliance"]
    },
    {
        id: "russian-mobilization",
        title: "Russian Mobilization",
        description: "As tensions escalated between Austria-Hungary and Serbia, Russia—the traditional protector of Slavic nations in the Balkans—began moving troops to the Austro-Hungarian borders. The Russian Empire had strong cultural and ethnic ties to the South Slavic peoples of the Balkans and saw itself as their defender against Austro-Hungarian expansion.\n\nKaiser Wilhelm II and German leadership anticipated that Russia would not actually initiate conflict, believing Russia was unprepared for war. The Kaiser demanded that Russia halt its mobilization and withdraw troops from the border, warning that failure to do so would result in war between Germany and Russia.\n\nFaced with this ultimatum, Tsar Nicholas II sought support from Great Britain while continuing Russian mobilization, setting the stage for a wider conflict.",
        date: "1914-07-30",
        location: {
            coordinates: [30.3351, 59.9343], // St. Petersburg, Russia
            name: "St. Petersburg",
            country: "Russian Empire"
        },
        media: [
            {
                type: "image",
                url: "/assets/images/russian-mobilization.jpg",
                caption: "Russian troops mobilizing in 1914",
                credit: "Russian State Archives"
            }
        ],
        importance: "critical",
        duration: 7000,
        links: [
            {
                text: "Learn about Russian mobilization",
                url: "https://en.wikipedia.org/wiki/Russian_entry_into_World_War_I"
            }
        ],
        tags: ["russia", "mobilization", "nicholas-ii"]
    },
    {
        id: "germany-declares-war-russia",
        title: "Germany Declares War on Russia",
        description: "Germany had been preparing for a potential conflict with Russia for some time, developing the Schlieffen Plan which outlined a strategy for fighting a two-front war against both Russia and France. When Russia refused to halt its mobilization, Germany was compelled to declare war.\n\nOn August 1, 1914, Germany officially declared war on Russia, transforming what had begun as a localized conflict between Austria-Hungary and Serbia into a continental war. This declaration marked a point of no return in the escalation of World War I.",
        date: "1914-08-01",
        location: {
            coordinates: [13.4050, 52.5200], // Berlin, Germany
            name: "Berlin",
            country: "German Empire"
        },
        media: [
            {
                type: "image",
                url: "/assets/images/german-declaration.jpg",
                caption: "German troops mobilizing after declaration of war",
                credit: "German Federal Archives"
            }
        ],
        importance: "critical",
        duration: 7000,
        links: [
            {
                text: "German declaration of war",
                url: "https://en.wikipedia.org/wiki/German_entry_into_World_War_I"
            }
        ],
        tags: ["germany", "declaration", "russia"]
    },
    {
        id: "germany-declares-war-france",
        title: "Germany Declares War on France",
        description: "German military planners had long anticipated that any war with Russia would inevitably involve France due to the Franco-Russian Alliance of 1894. Rather than waiting for France to enter the conflict on Russia's behalf, Germany preemptively declared war on France on August 3, 1914.\n\nThis decision was in accordance with the Schlieffen Plan, which called for a rapid defeat of France before turning to face Russia on the Eastern Front. The German strategy hinged on avoiding a prolonged two-front war by knocking France out of the conflict quickly.\n\nWith this declaration, the conflict expanded further, drawing Western Europe fully into what would become known as the Great War.",
        date: "1914-08-03",
        location: {
            coordinates: [2.3522, 48.8566], // Paris, France
            name: "Paris",
            country: "French Republic"
        },
        media: [
            {
                type: "image",
                url: "/assets/images/french-mobilization.jpg",
                caption: "French troops gathering in Paris",
                credit: "French Military Archives"
            }
        ],
        importance: "critical",
        duration: 7000,
        links: [
            {
                text: "Franco-Russian Alliance",
                url: "https://en.wikipedia.org/wiki/Franco-Russian_Alliance"
            }
        ],
        tags: ["france", "declaration", "schlieffen-plan"]
    }
];

// The complete World War I Timeline
export const worldWarITimeline: Timeline = {
    id: "world-war-i",
    title: "World War I",
    description: "World War I (28 July 1914 – 11 November 1918), often abbreviated as WWI, was one of the deadliest global conflicts in history. The war pitted the Allied Powers against the Central Powers and resulted in profound political, cultural, economic, and social change around the world.",
    period: {
        startDate: "1914-06-28", // Assassination of Franz Ferdinand
        endDate: "1918-11-11",   // Armistice Day
    },
    events: ww1Events,
    defaultZoom: 4,
    defaultCenter: [15.2551, 54.5260], // Roughly centered on Europe
    tags: ["world war", "20th century", "global conflict"]
};

export default worldWarITimeline;