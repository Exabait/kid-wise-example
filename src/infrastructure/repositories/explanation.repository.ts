import { SupabaseClient } from '@supabase/supabase-js';

import { IInstrumentationService } from '@/src/application/services/instrumentation.service.interface';
import { ISupabaseService } from '@/src/application/services/supabase.service.interface';
import { AppResponse } from '@/src/entities/common';

import { IExplanationRepository } from '../../application/repositories/explanation.repository.interface';
import { Language } from '../../entities/Languages';
import {
  PhraseExplanation,
  WordExplanation,
} from '../../entities/models/explanation';

function fromDb(data: any): WordExplanation {
  return {
    id: data.id,
    word: data.word,
    explanation: data.explanation,
    examples: data.examples,
    gameIdea: data.game_idea,
    fact: data.fact ?? null,
    imageUrl: data.image_url ?? null,
    createdAt: data.created_at,
  };
}

function toDb(explanation: Partial<WordExplanation>): any {
  return {
    word: explanation?.word,
    explanation: explanation?.explanation,
    examples: explanation?.examples,
    game_idea: explanation?.gameIdea,
    fact: explanation?.fact,
    image_url: explanation?.imageUrl,
    created_at: explanation?.createdAt,
  };
}

export class ExplanationRepository implements IExplanationRepository {
  private supabase: SupabaseClient;

  private tables = {
    words_en: 'words_en',
    words_uk: 'words_uk',
    phrases_en: 'phrases_en',
    phrases_uk: 'phrases_uk',
  };

  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly supabaseService: ISupabaseService
  ) {
    this.supabase = this.supabaseService.getClient();
  }

  async findByWord(
    word: string,
    language: Language = 'en'
  ): Promise<AppResponse<WordExplanation>> {
    return await this.instrumentationService.startSpan(
      { name: 'ExplanationRepository.findByWord' },
      async () => {
        const { data, error } = await this.supabase
          .from(this.getTablesNameByLanguage(language).word)
          .select('*')
          .eq('word', word.toLowerCase())
          .maybeSingle();
        if (error) return { data: null, error: error.message };
        return { data: data ? fromDb(data) : null };
      }
    );
  }

  async save(
    explanation: WordExplanation,
    language: Language = 'en'
  ): Promise<AppResponse<WordExplanation>> {
    return await this.instrumentationService.startSpan(
      { name: 'ExplanationRepository.save' },
      async () => {
        const dbData = {
          word: explanation.word.toLowerCase(),
          explanation: explanation.explanation,
          examples: explanation.examples,
          game_idea: explanation.gameIdea,
          fact: explanation.fact,
          image_url: null,
        };
        const { data, error } = await this.supabase
          .from(this.getTablesNameByLanguage(language).word)
          .upsert([dbData], { onConflict: 'word' })
          .select()
          .single();
        if (error) return { data: null, error: error.message };
        return { data: data ? fromDb(data) : null };
      }
    );
  }

  async updateWord(
    id: number,
    updates: Partial<WordExplanation>,
    language: Language
  ): Promise<{ success: boolean; error?: string }> {
    const dbData = toDb(updates);
    for (const key in dbData) {
      if (dbData[key] === null) {
        delete dbData[key];
      }
    }

    return await this.instrumentationService.startSpan(
      { name: 'ExplanationRepository.updateWord' },
      async () => {
        const { error } = await this.supabase
          .from(this.getTablesNameByLanguage(language).word)
          .update(dbData)
          .eq('id', id);
        if (error) return { success: false, error: error.message };
        return { success: true };
      }
    );
  }

  private getTablesNameByLanguage(language: Language = 'en'): {
    word: string;
    phrase: string;
  } {
    const tables: Record<Language, { word: string; phrase: string }> = {
      en: { word: this.tables.words_en, phrase: this.tables.phrases_en },
      uk: { word: this.tables.words_uk, phrase: this.tables.phrases_uk },
    };
    return tables[language];
  }
}
