export const getColorFromImage = async (imageUrl: string): Promise<string | null> => {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const img = new Image();
        img.src = URL.createObjectURL(blob);

        return new Promise((resolve) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const context = canvas.getContext('2d');
                if (context) {
                    context.drawImage(img, 0, 0, img.width, img.height);
                    const imageData = context.getImageData(0, 0, img.width, img.height);
                    const data = imageData.data;
                    let r = 0, g = 0, b = 0;

                    for (let i = 0; i < data.length; i += 4) {
                        r += data[i];
                        g += data[i + 1];
                        b += data[i + 2];
                    }

                    r = Math.floor(r / (data.length / 4));
                    g = Math.floor(g / (data.length / 4));
                    b = Math.floor(b / (data.length / 4));

                    resolve(`rgb(${r}, ${g}, ${b})`);
                } else {
                    resolve(null);
                }
            };
            img.onerror = () => resolve(null);
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        return null;
    }
}