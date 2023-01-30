export {
    Case,
    CaseEntry,
    caseFromEntry,
    fromEntries,
    /* eslint-disable deprecation/deprecation -- TODO: Remove in v0.10.0 */
    Statement,
    StatementEntry,
    statements,
    /* eslint-enable deprecation/deprecation */
} from './match/case';
export {
    Match,
    match,
} from './match/match';
export { when } from './match/when';
