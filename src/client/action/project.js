import { Action } from 'ive-f';
import { LoadDiagram } from './diagram';

export const LoadProject = new Action((params, done) => {
	LoadDiagram.trigger();
	return done(params);
});

export const CreateProject = new Action((params, done) => {
	LoadDiagram.trigger();
	return done(params);
});

export const UpdateProject = new Action();