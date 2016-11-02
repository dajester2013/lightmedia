module.exports = {
    settings: {
        server: {
            port: 5980
        },
        windows: {
            output: {
                display: "secondary",
                enabled: true
            },
            stage: {
                display: "tertiary",
                enabled: false,
                layout: [
                    {height:.15, items: ["clock", "spacer", "media-title", "spacer", "timer"]},
                    {height:.5, items: ["current-slide-text"]},
                    {height:.3, items: ["next-slide-text"]},
                ]
            }
        }
    }
};