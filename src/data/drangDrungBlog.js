export const drangDrungBlog = {
  slug: "drang-drung-glacier-timelapse",
  title: "Ninety Minutes at a Time: How a Roadside Camera Caught a Himalayan Glacier in the Act",
  subtitle:
    'A new study from Drang Drung Glacier in the western Himalaya shows that "slow" mountain glaciers have a far richer, more hydrologically restless inner life than satellites have been telling us, and that a single time-lapse camera, left running through a Ladakhi winter, can prove it.',
  date: "2026-05-09",
  category: "Glaciology",
  readTime: "9 min read",
  videoId: "tvMpqS_PE7E",
  videoTitle: "Drang Drung Glacier time-lapse",
  sections: [
    {
      paragraphs: [
        "If you've ever crossed Pensi La in late autumn, you know the kind of silence that settles between the wind gusts. The road from Kargil into Zanskar narrows there, the air thins, and the Drang Drung Glacier opens up below the pass like a slow, white river caught mid-sentence. Most travelers stop, take a photograph, and move on before the cold gets serious. A camera bolted to a boulder near its lateral moraine has done something rather different. It has stayed.",
        "From October 2023 to April 2025, that camera blinked open every ninety minutes through daylight hours. It was not always cooperative. The team found the system damaged on the first attempted retrieval and had to reinstall it, then lost nearly three months in early 2024 when snow buried it completely. Even so, it delivered roughly 3,250 usable images by July 2025, one of the longest, highest-frequency observational records ever compiled for any Himalayan glacier.",
        'The resulting study, by Pawan Singh and Saurabh Vijay (IIT Roorkee) with Mohd Farooq Azam (IIT Indore), published in Science of Remote Sensing, asks a deceptively simple question: what does a "slow" Himalayan glacier actually do, when you watch it closely enough to see it move? The answer, it turns out, is more than we thought, and on shorter timescales than satellites can resolve.',
      ],
    },
    {
      heading: "Why slow glaciers deserve our patience",
      paragraphs: [
        "Public conversation about Himalayan ice has focused on the dramatic glaciers: calving fronts, surging tributaries of the Karakoram, lakes that swell and sometimes burst. Slow-moving glaciers above 4,000 meters, those flowing under a hundred meters per year, have remained quietly understudied. Their motions are subtle, their margins often debris-covered, and their seasonal rhythms blur into the noise of satellite measurements, where typical uncertainties of 30 to 50 meters can swallow an entire year of motion whole.",
        "Yet these glaciers anchor much of the region's hydrology. They feed the headwaters of rivers that sustain hundreds of millions of people downstream. How they accelerate when meltwater enters their beds, and slow when the plumbing shuts down for winter, is woven into questions of water security, flood hazard, and climate response. We have rarely had the means to watch them in fine enough detail.",
        "That is the gap this study sets out to close.",
      ],
    },
    {
      heading: "A camera, a moraine, and a lake-terminating glacier",
      paragraphs: [
        "Drang Drung is, on paper, an ideal test case. The largest glacier in both the Zanskar and Ladakh ranges, it covers roughly 69.6 km2 and stretches about 24 kilometers down a valley with an average slope of 18 degrees. Most of its terminus reaches into Drang Drung Lake, a proglacial lake that did not exist before about 2014. Formed as the glacier retreated, it now spans 0.28 km2. A small portion of the tongue still ends on land, much of it buried under debris up to thirty centimeters thick. Within a single accessible field of view, the lower glacier offers clean ice and debris-covered ice, lake-terminating and land-terminating margins.",
        "Turning the images into ice velocities is where the technical work begins. The team selected daily images taken near 1300 hours local time to keep illumination consistent (about 370 frames in total) and split them into three groups, since the camera's pose shifted slightly with each retrieval. After image enhancement, distinctive surface features such as boulders, crevasse edges, and debris patches were detected with the SIFT algorithm and tracked frame-to-frame using Kanade-Lucas-Tomasi optical flow. A RANSAC filter weeded out spurious matches. Photogrammetric scaling, calibrated against GNSS-surveyed control points, then converted pixel motion into meters of horizontal and vertical displacement.",
        "The team set three regions of interest: ROI1 on the peripheral clean-ice, lake-terminating zone, ROI2 closer to the centerline of the same lake-terminating sector, and ROI3 on the debris-covered, land-terminating tongue. The velocities were checked against in-situ GNSS measurements at an ablation stake near ROI2. They agreed. They were also compared against the widely used ITS_LIVE satellite velocity product. They did not agree, and that disagreement is one of the most consequential findings of the paper.",
      ],
    },
    {
      heading: "What the glacier was actually doing",
      paragraphs: [
        "When the team stitched eighteen months of frames into a coherent record, several things came clearly into view.",
        "The first was spatial heterogeneity that earlier satellite-only studies had washed out. The lake-terminating sector at ROI1 moved at an annual mean of 35.4 meters per year, while the land-terminating ROI3 moved at 19.5 meters per year, a ratio of nearly 1.8 to 1 within a single glacier. Even within the lake-terminating zone, the centerline ROI2 ran slower than ROI1, almost certainly because it sits over ice five to ten meters thinner, with less driving stress, and over slightly dirtier ice with fewer moulins to deliver meltwater to the bed. Drang Drung's lake is acting on the ice. Terminating in water rather than grinding against rock and sediment reduces basal resistance, but the effect is itself spatially uneven.",
        "The second finding was that Drang Drung has a seasonal pulse, and not just one. The team identified a primary speedup from June through September, when air temperatures and solar radiation peak, and a corresponding slowdown into November as the surface cools. At ROI1, that summer acceleration is roughly forty percent above the autumn minimum. Vertical velocities, essentially the rate at which the surface drops away as the glacier thins and slides, hit -2.0 meters per month at ROI1 during July and August, and were essentially flat the rest of the year.",
        "But there was a second, smaller cycle they did not expect to see so cleanly. From November to January, after the obvious melt season had ended, the glacier briefly sped up again before settling into a steady slowdown that lasted into February. At debris-covered ROI3, this winter pulse was startlingly large, close to a forty percent acceleration above the autumn minimum. The most plausible explanation is one familiar to alpine glaciologists working in the Alps and Alaska but rarely demonstrated in the Himalaya: as subglacial drainage channels close under the weight of overlying ice through viscous deformation, water trapped inside them gets pressurized. Pressurized water at the bed reduces friction. The glacier nudges forward, briefly, before the system finds a new equilibrium. The signal is strongest at ROI3 because debris-covered tongues drain water inefficiently, and inefficient drainage is exactly what generates winter speedup.",
      ],
    },
    {
      heading: "Five days in June",
      paragraphs: [
        "The most dynamic findings emerged when the team looked sub-weekly. In June 2024, they identified five distinct velocity peaks. The first, on 9 June, coincided with the disintegration of frozen lake ice at the terminus, visible directly in the camera frames. The next two were the most striking: on 12 June, the glacier sped up to 25.4 m/yr while the terminus rose by as much as two meters, and on 18 June, another acceleration to 27.8 m/yr came with a 0.75-meter uplift. It is hard to imagine a more direct signature of basal water pressures approaching flotation and momentarily lifting the ice off its bed.",
        "The lake itself was visibly transforming through the same window. On 12 June, both camera and PlanetScope satellite imagery showed a largely ice-covered surface. By the 16th, ice was breaking up and sediment plumes were forming. By the 25th, the water had become uniformly turbid and brown, a visual marker of an active, channelised subglacial drainage system flushing sediment out from beneath the ice. In autumn, the same lake quietly transitioned back to clear blue water as the meltwater supply contracted and drainage channels collapsed for the season.",
      ],
    },
    {
      heading: "The satellites had been telling us a quieter story",
      paragraphs: [
        "This is where the study's most pointed comparison sits. Against the camera- and GNSS-derived numbers, the ITS_LIVE product significantly underestimated motion at all three ROIs: roughly 13 m/yr at ROI1, 9 m/yr at ROI2, and just 3.5 m/yr at ROI3, against terrestrial values of 35.4, around 20, and 19.5 m/yr respectively.",
        "This is not a critique of ITS_LIVE so much as a reminder of what it was built for. Its underlying autoRIFT algorithm has performed well in polar regions where glaciers are large and fast and surface contrast is strong. On a small, slow, high-altitude Himalayan glacier with a featureless surface, optical feature tracking from Landsat (30 m pixels) or Sentinel-2 (10 m pixels) is operating at the edge of what it was designed to resolve. The implication is constructive: terrestrial time-lapse systems can serve as ground-truth nodes that calibrate and correct space-based products in places where satellites are working at the edge of their capabilities.",
      ],
    },
    {
      heading: "What this means for the region's ice and water",
      paragraphs: [
        "If ITS_LIVE-class products are systematically underestimating velocities for an entire class of slow Himalayan glaciers, regional assessments of ice flux and meltwater delivery may be carrying biases we have not fully reckoned with. There is also a hazard dimension: lake-terminating glaciers are exactly the systems where proglacial lakes can grow as ice retreats, and where calving, basal water pressure, and lake-level changes shape long-term outburst risk.",
        "The vertical-velocity record carries another quietly significant signal. The team's camera-based surface thinning of 7.5 meters over 125 melt-season days agrees with field-based mass balance estimates of about -8.04 meters at the same elevation, but is dramatically more negative than the long-term geodetic thinning rate of -3.6 +/- 3.4 m/yr recorded between 2015 and 2020. Some of that difference is short-record uncertainty, but the authors argue it also reflects a real recent acceleration of ice loss, driven by reduced overall snowfall and a shift in snowfall timing from early December to late February. Less snow, arriving later, means shorter snow retention, earlier exposure of bare ice, and a longer melt season.",
      ],
    },
    {
      heading: "A small instrument for a large question",
      paragraphs: [
        "There is something quietly hopeful about this study. It does not require a new satellite or a new mission concept. It requires a camera, a power source, a clear line of sight, and the patience to leave it running through a Himalayan winter, knowing it might be vandalised, buried in snow, or fogged out for weeks. Most of the glaciologist's craft, here, is the craft of staying.",
        "The Himalaya is a vast, instrumentally thin range. Time-lapse systems like the one above Drang Drung will not change that overnight, but they show, persuasively, that meaningful glaciological measurement does not always require expedition-scale logistics. It can begin with a single lens, pointed steadily at a moving body of ice, and a willingness to wait. In a region where so much depends on understanding what the ice is doing, that may turn out to be a more transformative idea than it first appears.",
      ],
    },
  ],
};
