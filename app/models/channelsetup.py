from app import db

class Channelsetup(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    
    name = db.Column(db.String)
    
    samplingrate = db.Column(db.Integer)
    
    sensitivity = db.Column(db.Float)
    
    autorangetime = db.Column(db.Integer)
    
    peakvalue = db.Column(db.Float)
    

    def to_dict(self):
        return dict(
            name = self.name,
            samplingrate = self.samplingrate,
            sensitivity = self.sensitivity,
            autorangetime = self.autorangetime,
            peakvalue = self.peakvalue,
            id = self.id
        )

    def __repr__(self):
        return '<Channelsetup %r>' % (self.id)
