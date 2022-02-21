import cn from 'classnames'
import styles from '../styles/alert.module.css'
type Props = {
    children ?: JSX.Element|JSX.Element[];  // FunctionComponent.
    type ?: string;
}
export default function Alert({ children, type }:Props) {
    return (
        <div
            className={cn({
                [styles.success]: type === 'success',
                [styles.error]: type === 'error'})}>
                {children}
        </div>
    )
}