import { Controller, Get } from '@nestjs/common';

@Controller('pages')
export class PagesController {

    @Get()
    test(): string {
        return "test"
    }

}
