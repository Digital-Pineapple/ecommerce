import { useState } from 'react';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TagItem from './TagItem';

export const TagList = ({ tags, brand }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="mb-5">
            <div className="flex cursor-pointer justify-between"
                onClick={() => setOpen(!open)}
            >
                <p className="text-lg font-bold uppercase">Tags</p>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <ul className="relative">
                {
                    tags?.map(tag => (
                        <Collapse in={open} timeout="auto" unmountOnExit
                            key={tag._id}
                        >
                            <TagItem tag={tag} brand={brand} />
                        </Collapse>
                    ))
                }
            </ul>
        </div>
    )
}
