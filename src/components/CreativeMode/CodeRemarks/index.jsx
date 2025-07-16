import classes from './CodeRemarks.module.css';

function CodeRemarks() {
    const remarks = [
        'if (user.isCurious) { explore(); }',
        'try { learn(); } catch (failure) { grow(); }',
        'if (world.needsChange) { buildSolution(); }',
        'do { expandPerspective(); } while (truth.isVast);',
        'for (idea in ideas) { innovate(idea); }'
    ];

    return (
        <div className={classes.floatingRemarks}>
            {remarks.map((remark, index) => (
                <div key={index} className={classes.remark}>{remark}</div>
            ))}
        </div>
    );
}

export default CodeRemarks;