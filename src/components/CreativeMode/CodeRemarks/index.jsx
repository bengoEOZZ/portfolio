/**
 * CODEREMARKS COMPONENT - FLOATING PHILOSOPHICAL CODE SNIPPETS
 * =============================================================
 * 
 * This component renders floating code-style remarks that display philosophical
 * and inspirational messages written as JavaScript code snippets.
 * 
 * Key Features:
 * - Collection of philosophical code snippets as floating text elements
 * - JavaScript syntax used as a creative medium for expressing ideas
 * - Subtle animations and effects that enhance the starry night celestial atmosphere
 */

// DEPENDENCIES
import classes from './CodeRemarks.module.css';

/**
 * CodeRemarks Component
 * =====================
 */
function CodeRemarks() {
    /**
     * Philosophical Code Snippets
     * ============================
     * 
     * Collection of JavaScript-style code snippets that express philosophical
     * ideas about development, learning, and innovation. Each remark combines
     * technical syntax with inspirational messaging.
     * 
     * Content Philosophy:
     * - Curiosity and exploration: "if (user.isCurious) { explore(); }"
     * - Growth through failure: "try { learn(); } catch (failure) { grow(); }"
     * - Problem-solving mindset: "if (world.needsChange) { buildSolution(); }"
     * - Continuous learning: "do { expandPerspective(); } while (truth.isVast);"
     * - Innovation drive: "for (idea in ideas) { innovate(idea); }"
     */
    const remarks = [
        'if (user.isCurious) { explore(); }',
        'try { learn(); } catch (failure) { grow(); }',
        'if (world.needsChange) { buildSolution(); }',
        'do { expandPerspective(); } while (truth.isVast);',
        'for (idea in ideas) { innovate(idea); }'
    ];

    return (
        <div className={classes.container}>
            {remarks.map((remark, index) => (
                <div key={index} className={classes.remark}>{remark}</div>
            ))}
        </div>
    );
}

export default CodeRemarks;