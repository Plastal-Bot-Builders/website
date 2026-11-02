import { fetchEvents, getEventBySlug, createEvent, registerForEvent } from './events';
import { getJson, postJson } from './client';
jest.mock('./client', () => ({getJson:jest.fn(),postJson:jest.fn(),putJson:jest.fn(),delJson:jest.fn()}));
beforeEach(() => jest.clearAllMocks());
test('lists events using one API prefix and unwraps the response', async () => {
 const data = [{_id:'event1',title:'Test'}];
 (getJson as jest.Mock).mockResolvedValue({data});
 expect(await fetchEvents()).toEqual(data);
 expect(getJson).toHaveBeenCalledWith('/events');
});
test('looks up encoded slugs through the correct route', async () => {
 (getJson as jest.Mock).mockResolvedValue({data:{_id:'event1'}});
 expect(await getEventBySlug('test event')).toEqual({_id:'event1'});
 expect(getJson).toHaveBeenCalledWith('/events/slug/test%20event');
});
test('creates and registers using relative API paths', async () => {
 const event = {title:'Test',description:'Test',date:'2027-01-01',location:'Online'};
 (postJson as jest.Mock).mockResolvedValue({data:{...event,_id:'event1'}});
 expect(await createEvent(event,'test-token')).toHaveProperty('_id','event1');
 expect(postJson).toHaveBeenCalledWith('/events',event,{token:'test-token'});
 const registration = {fullName:'Test',email:'test@example.com'};
 await registerForEvent('event1',registration);
 expect(postJson).toHaveBeenCalledWith('/events/event1/register',registration);
});
