import {VoterService} from './voter.service'
import {ISession} from '../shared/event.model'
import {Observable} from 'rxjs/Rx'

describe('VoterService', () => {
    let voterService: VoterService;
    let mockHttp;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    })

    describe('deleteVoter', () => {
        it('should remove the voter from list of voters', () => {
            var session = {
                id: 6, 
                voters: ["guy", "other"]
            };
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(3, <ISession>session, "guy");

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("other");
        })

        it('should call http.delete with the right url', () => {
            var session = {
                id: 6, 
                voters: ["guy", "other"]
            };
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(3, <ISession>session, "guy");

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/guy');
        })
    })

    describe('addVoter', () => {
        it('should call http.post with the right url', () => {
            var session = {
                id: 6, 
                voters: ["john"]
            };
            mockHttp.post.and.returnValue(Observable.of(false));

            voterService.addVoter(3, <ISession>session, "john");

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/john', "{}", jasmine.any(Object));
        })
    })
})