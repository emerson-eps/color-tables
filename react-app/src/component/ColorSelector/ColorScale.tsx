import Colorscale from 'react-colorscales';

const viridisColorscale = ['#ff0000', '#b6b600', '#00ff00', '#00b6b6', '#0000ff', '#b600b6'];
const scale = ['#fafa6e', '#bdea75', '#86d780', '#54c18a', '#23aa8f', '#00918d', '#007882', '#1f5f70', '#2a4858']
const physics = ['#FF0000', '#B6B600', '#00FF00', '#00B6B6', '#0000FF']

class ColorScale extends Colorscale {
    ColorScale = () => {
        return (
            <div>
                <div>
                    <Colorscale
                        colorscale={viridisColorscale}
                        onClick={() => {}}
                        width={50}
                        label={"true"}
                    />
                </div>
            </div>
            
        );
    };
}

export default ColorScale;