import { PropTypes } from 'prop-types';
export default function CounterButton({ by, incrementMethod, decmentMethod }) {

    return (
        <div className="counter">

            <div>
                <button className="counterButton"
                    onClick={() => incrementMethod(by)}>
                    +{by}
                </button>

                <button className="counterButton"
                    onClick={() => decmentMethod(by)}>
                    -{by}
                </button>
            </div>
        </div >
    )
}

CounterButton.propTypes = {
    by: PropTypes.number,
}

CounterButton.defaultProps = {
    by: 1,
}