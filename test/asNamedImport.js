import { BetterSet } from "../src/index.js";

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised)
chai.should()

describe('As Named Import', () => {
    it("should be defined", () => {
        BetterSet.should.not.be.undefined
    })

    it("should be constructable", () => {
        const s = new BetterSet();
        s.should.not.be.undefined
        s.should.be.instanceOf(BetterSet)
    })
})