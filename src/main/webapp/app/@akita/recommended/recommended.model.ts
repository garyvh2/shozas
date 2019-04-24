import { RealState } from 'app/@akita/real-state';

export class RecommendedState {
    public recommended: RealState[];
}

export function initialRecommendedState(): RecommendedState {
    return {
        recommended: []
    };
}
