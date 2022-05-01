import { on } from "events";
import PokeButton from "../button/PokeButton";
import './NumPad.css';

type props = {
    onClick: (n: number) => void;
}

const NumPad = ({ onClick }: props) => <div className="num-pad">
    {Array.from(Array(10).keys()).map((_, i) => {
        let value = i + 1 > 9 ? 0 : i + 1;
        return <PokeButton
            key={`button-${value}`}
            onClickPokebutton={() => {console.log(value); onClick(value)}}
            text={value}
            color={'blue'}
            shape="square" />;
    })}
</div>;

export default NumPad;