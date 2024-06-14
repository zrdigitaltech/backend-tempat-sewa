<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GaleriResource\Pages;
use App\Filament\Resources\GaleriResource\RelationManagers;
use App\Models\Galeri;
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
use Filament\Forms\Components\Repeater;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;


class GaleriResource extends Resource
{
    protected static ?string $model = Galeri::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Gallery';

    protected static ?string $navigationGroup = 'Gallery';

    protected static ?int $navigationSort = 3;

    protected static ?string $label = 'Gallery';

    protected static ?string $slug = 'gallery';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Card::make()
                    ->schema([
                        FileUpload::make('image')
                            ->required(),
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('width')
                            ->numeric()
                            ->required()
                            ->maxLength(255),
                        TextInput::make('height')
                            ->numeric()
                            ->required()
                            ->maxLength(255),
                        TextInput::make('alt')
                          ->default('Mekanik Elektro'),
                        Textarea::make('description'),
                        Repeater::make('tags')
                          ->schema([
                              TextInput::make('value')
                                ->default('Mekanik Elektro')
                                ->maxLength(255),
                              TextInput::make('title')
                                ->default('Mekanik Elektro')
                                ->maxLength(255),
                          ])
                          ->label('Tags')
                          ->maxItems(1)
                          ->disableItemMovement()
                          ->disableItemDeletion(),
                ])->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title'),
                ImageColumn::make('image'),
                TextColumn::make('width'),
                TextColumn::make('height'),
            ])
            ->filters([
                //
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                  DeleteBulkAction::make(),
                  CreateAction::make()
                  ->createAnother(false)
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
            'index' => Pages\ListGaleris::route('/'),
            'create' => Pages\CreateGaleri::route('/create'),
            'edit' => Pages\EditGaleri::route('/{record}/edit'),
        ];
    }
}
