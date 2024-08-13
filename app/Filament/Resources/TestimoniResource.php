<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimoniResource\Pages;
use App\Filament\Resources\TestimoniResource\RelationManagers;
use App\Models\Testimoni;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Card;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextArea;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

use Filament\Tables\Enums\FiltersLayout;

class TestimoniResource extends Resource
{
  protected static ?string $model = Testimoni::class;

  protected static ?string $navigationIcon = 'heroicon-o-user-group';

  protected static ?string $navigationLabel = 'Testimonial';

  protected static ?string $navigationGroup = 'Testimonial';

  protected static ?int $navigationSort = 5;

  protected static ?string $label = 'Testimonial';

  protected static ?string $slug = 'testimonial';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          FileUpload::make('image')
            ->required()
            ->acceptedFileTypes(['image/*']),
          TextInput::make('name')->required()->maxLength(255),
          TextInput::make('position')->required()->maxLength(255),
          TextInput::make('alt')->default('Nama Pemilik Kontrakan')->maxLength(255),
          TextArea::make('description')->rows(3)->maxLength(255),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        ImageColumn::make('image'),
        TextColumn::make('name')->searchable(),
        TextColumn::make('position')->searchable(),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters([
        //
      ])
      ->actions([
        ViewAction::make()->iconButton(),
        EditAction::make()->iconButton(),
        DeleteAction::make()->iconButton(),
      ])
      ->bulkActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
          CreateAction::make()->createAnother(false),
        ]),
      ]);
  }

  public static function getRelations(): array
  {
    return [
        //
      ];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListTestimonis::route('/'),
      'create' => Pages\CreateTestimoni::route('/create'),
      'edit' => Pages\EditTestimoni::route('/{record}/edit'),
    ];
  }
}
