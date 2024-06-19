<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NumberLayananResource\Pages;
use App\Filament\Resources\NumberLayananResource\RelationManagers;
use App\Models\NumberLayanan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Card;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextArea;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

class NumberLayananResource extends Resource
{
  protected static ?string $model = NumberLayanan::class;

  protected static ?string $navigationIcon = 'heroicon-s-information-circle';

  protected static ?string $navigationLabel = 'Number Layanan';

  protected static ?string $navigationGroup = 'Home';

  protected static ?int $navigationSort = 1;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          TextInput::make('tahun_pengalaman')
            ->label('Years Experience')
            ->required()
            ->numeric()
            ->maxLength(255),
          TextArea::make('description_pengalaman')
            ->label('Description Experience')
            ->required()
            ->rows(3)
            ->maxLength(255),
          TextArea::make('certification_description')
            ->label('Description Certification')
            ->required()
            ->rows(3)
            ->maxLength(255),
          TextArea::make('operasional_description')
            ->label('Description Operational')
            ->required()
            ->rows(3)
            ->maxLength(255),
          TextArea::make('harga_wajar_description')
            ->label('Description Price')
            ->required()
            ->rows(3)
            ->maxLength(255),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->paginated(false)
      ->selectable(false)
      ->columns([
        TextColumn::make('tahun_pengalaman')->label('Years Experience'),
        TextColumn::make('description_pengalaman')->label('Description Experience'),
      ])
      ->filters([
        //
      ])
      ->actions([ViewAction::make(), EditAction::make(), DeleteAction::make()])
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
      'index' => Pages\ListNumberLayanans::route('/'),
      'create' => Pages\CreateNumberLayanan::route('/create'),
      'edit' => Pages\EditNumberLayanan::route('/{record}/edit'),
    ];
  }
}
