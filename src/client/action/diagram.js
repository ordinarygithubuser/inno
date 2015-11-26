import { Action } from 'ive-f';
import { LoadNodes } from './node';
import { SetContext } from './context';

export const LoadDiagram = new Action((params, done) => {
	LoadNodes.trigger(params);
	SetContext.trigger(null);
	return done(params);
});

export const CreateDiagram = new Action((params, done) => {
	LoadNodes.trigger(params);
	SetContext.trigger(null);
	return done(params);
});

export const UpdateDiagram = new Action();

/**
 * Edges
 */

export const CreateEdge = new Action();

export const UpdateEdge = new Action();

export const DeleteEdge = new Action();