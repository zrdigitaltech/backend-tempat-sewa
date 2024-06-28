<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FloatingWhatsappResource\Pages;
use App\Filament\Resources\FloatingWhatsappResource\RelationManagers;
use App\Models\FloatingWhatsapp;
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

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

class FloatingWhatsappResource extends Resource
{
  protected static ?string $model = FloatingWhatsapp::class;

  protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-ellipsis';

  protected static ?int $navigationSort = 2;

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          FileUpload::make('avatar')
            ->required()
            ->acceptedFileTypes(['image/*']),
          TextInput::make('phone_number')
            ->label('Phone Number')
            ->numeric()
            ->placeholder('628xxxxxxxx')
            ->required()
            ->numeric()
            ->maxLength(255),
          TextInput::make('account_name')->label('Account Name')->required()->maxLength(255),
          TextInput::make('chat_message')->label('Chat Message')->required()->maxLength(255),
          TextInput::make('status_message')->label('Status Message')->maxLength(255),
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
        ImageColumn::make('avatar'),
        TextColumn::make('phone_number'),
        TextColumn::make('account_name'),
      ])
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
      'index' => Pages\ListFloatingWhatsapps::route('/'),
      'create' => Pages\CreateFloatingWhatsapp::route('/create'),
      'edit' => Pages\EditFloatingWhatsapp::route('/{record}/edit'),
    ];
  }
}
