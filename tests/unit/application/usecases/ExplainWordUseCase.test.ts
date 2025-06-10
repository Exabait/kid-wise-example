import {
  ExplainWordUseCase,
  IOpenAIService,
} from '../../../../src/application/usecases/explanation/ExplainWordUseCase';
import { Explanation } from '../../../../src/entities/models/explanation';

describe('ExplainWordUseCase', () => {
  it('should return an explanation for a given word', async () => {
    // Arrange: mock the service
    const mockService: IOpenAIService = {
      explainWord: jest.fn(
        async (word: string): Promise<Explanation> => ({
          word,
          simple: `Simple explanation for ${word}`,
          verses: [`${word} is fun!`, `Let's run!`],
          gameIdea: `Find things like ${word}!`,
        })
      ),
    };

    const useCase = new ExplainWordUseCase(mockService);

    // Act
    const result = await useCase.execute('apple');

    // Assert
    expect(result.word).toBe('apple');
    expect(result.simple).toBe('Simple explanation for apple');
    expect(result.verses).toEqual(['apple is fun!', "Let's run!"]);
    expect(result.gameIdea).toBe('Find things like apple!');
    expect(mockService.explainWord).toHaveBeenCalledWith('apple');
  });
});
