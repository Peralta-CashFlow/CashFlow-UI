import styles from './BaseColorPicker.module.css'
import { HexColorPicker } from "react-colorful"

interface BaseColorPicker {
    onChange: (newColor: string | undefined) => void,
    color: string | undefined,
    label: string,
    width?: string,
    height?: string
}

const BaseColorPicker: React.FC<BaseColorPicker> = ({
    onChange, color, label, width, height
}) => {
    return (
        <div className={styles.container}>
            <HexColorPicker
                color={color}
                onChange={onChange}
                style={{
                    width: width,
                    height: height
                }}
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