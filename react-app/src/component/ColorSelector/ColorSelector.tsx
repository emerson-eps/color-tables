import ColorscalePicker from 'react-colorscales';
import COLORSCALE_TYPES from 'react-colorscales'

const viridisColorscale = ['#ff0000', '#b6b600', '#00ff00', '#00b6b6', '#0000ff', '#b600b6'];
const scale = ['#fafa6e', '#bdea75', '#86d780', '#54c18a', '#23aa8f', '#00918d', '#007882', '#1f5f70', '#2a4858']
const physics = ['#FF0000', '#B6B600', '#00FF00', '#00B6B6', '#0000FF']

class ColorSelector extends ColorscalePicker {
componentDidMount() {
    document.querySelector("p.colorscaleDescription").style.display='none';

    // const test = document.querySelector("div.Select-menu")
    // test.addEventListener("onmouseup", function(e) {
    //     let container = e.target.innerHTML
    //     console.log(e);
    //     console.log(container);
        
    // })
    // const value = '<div class="Select-option" role="option" aria-label="divergent scales" id="react-select-2--option-1">Emerson</div>'
    // test.innerHTML
}

    ColorSelectorData = () => {
        return (
            <div>
                <div>
                    <ColorscalePicker 
                        colorscale={viridisColorscale}
                    />
                </div>
            </div>
            
        );
    };
}

export default ColorSelector;