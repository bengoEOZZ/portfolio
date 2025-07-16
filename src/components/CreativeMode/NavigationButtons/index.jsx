import { useRef } from 'react';
import useOrbitAnimation from './useOrbitAnimation';
import classes from './NavigationButtons.module.css';

import Shield from '../../../assets/Shield.svg';

function NavigationButtons() {
    const buttonsWrapperRef = useRef(null);
    useOrbitAnimation(buttonsWrapperRef, classes.btn); // Pass the scoped class name

    const navItems = [
        { id: 'about', text: 'About' },
        { id: 'coding', text: 'Coding' },
        { id: 'projects', text: 'Projects' },
        { id: 'contact', text: 'Contact' }
    ];

    return (
        <div ref={buttonsWrapperRef} className={classes.buttonsWrapper}>
            {navItems.map(item => (
                <a key={item.id} href={`#${item.id}`} className={classes.btn}>
                    <img src={Shield} alt={`${item.text} Shield`} className={classes.btnShield} />
                    <span className={classes.btnText}>{item.text}</span>
                </a>
            ))}
        </div>
    );
}

export default NavigationButtons;