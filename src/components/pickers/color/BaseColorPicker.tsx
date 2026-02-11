import styles from './BaseColorPicker.module.css'
import { HexColorPicker } from "react-colorful"

interface BaseColorPicker {
    onChange: (newColor: string | undefined) => void,
    color: string | undefined,
    label: string
}

const BaseColorPicker: React.FC<BaseColorPicker> = ({
    onChange, color, label
}) => {
    return (
        <div className={styles.container}>
            <HexColorPicker
                color={color}
                onChange={onChange}
            />
            <div className={styles.colorTextContainer}>
                {color != undefined &&
                    <button
                        className={styles.colorRemove}
                        onClick={() => onChange(undefined)}
                        type='button'
                    >
                        x
                    </button>
                }
                <p>{label}: {color}</p>
            </div>
        </div>
    )
}

export default BaseColorPicker;