import { useState } from 'react';
import ClosedMenu from './ClosedMenu';
import OpenMenu from './OpenMenu';

const Menu: React.FC = ({}) => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <OpenMenu setOpen={setOpen} open={open} />
            <ClosedMenu setOpen={setOpen} open={open} />
        </div>
    )
}

export default Menu;