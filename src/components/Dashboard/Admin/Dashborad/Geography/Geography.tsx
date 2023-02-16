import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geographyData } from "@/lib/geographyData/geographyData";

const Geography = () => {
    return (
        <div>
            <ResponsiveChoropleth
                data={[]}
                features={geographyData.features}
                margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                theme={{
                    axis: {
                      domain: {
                        line: {
                          stroke: "#000",
                        },
                      },
                      legend: {
                        text: {
                          fill: "#000",
                        },
                      },
                      ticks: {
                        line: {
                          stroke: "#000",
                          strokeWidth: 1,
                        },
                        text: {
                          fill: "#000",
                        },
                      },
                    },
                    legends: {
                      text: {
                        fill: "#000",
                      },
                    },
                    tooltip: {
                      container: {
                        color: "#000",
                      },
                    },
                  }}
                domain={[0, 60]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={150}
                projectionTranslation={[0.45, 0.6]}
                projectionRotation={[0, 0, 0]}
                borderWidth={1.3}
                borderColor="#ffffff"
                legends={[
                    {
                        anchor: "bottom-left",
                        direction: "column",
                        justify: true,
                        translateX: 20,
                        translateY: -100,
                        itemsSpacing: 0,
                        itemWidth: 94,
                        itemHeight: 18,
                        itemDirection: "left-to-right",
                        itemTextColor: "#444444",
                        itemOpacity: 0.85,
                        symbolSize: 18,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: "#000000",
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default Geography;
