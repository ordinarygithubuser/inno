import { Action } from 'ive-f';
import { SetNode } from './node';
import { SetContext } from './context';

export const LoadDiagram = new Action((params, done) => {
	SetNode.trigger(null);
	SetContext.trigger(null);
	return done(params);
});

export const CreateDiagram = new Action((params, done) => {
	SetNode.trigger(params);
	SetContext.trigger(null);
	return done(params);
});

export const UpdateDiagram = new Action();